import express from "express";
import bodyParser from "body-parser";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { fileURLToPath } from "url";
import { dirname, join} from "path";
import cors from "cors";

// 구글 로그인 위해 추가
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "db.json");

const adapter = new JSONFile(dbPath);
//  저장을 위한 디폴트 변경
const defaultData = { users: [], posts: [] };
const db = new Low(adapter, defaultData);

await db.read();

// google login
dotenv.config(); // .evn에서 클라이언트 ID/비밀번호 읽기

const app = express();
const PORT = 9000;

app.use(cors()); // CORS 미들웨어를 여기에 적용
app.use(bodyParser.json());

// 회원가입 API
app.post("/register", async (req, res) => {
  const { username, email, password, nickname } = req.body;

  if (!username || !email || !password || !nickname) {
    return res.status(400).json({ error: "모든 필드를 입력해주세요." });
  }

  // 이미 존재하는 아이디 또는 이메일 확인
  const existingUser = db.data.users.find(
    (user) => user.username === username || user.email === email
  );
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "이미 사용 중인 아이디 또는 이메일입니다." });
  }

  db.data.users.push({ id: Date.now(), username, email, password, nickname });
  await db.write();

  res.status(201).json({ message: "회원가입 성공" });
});

// 아이디 이메일 중복 확인(가입 정보 입력 과정에서 유효성 검사)
app.post("/api/check-username", async (req, res) => {
  await db.read();
  db.data ||= { users: [] };

  console.log("요청 body:", req.body);
  const { username } = req.body;

  if (!username) {
    console.error("username이 없음!");
    return res.status(400).json({ error: "username 필드가 없습니다." });
  }

  const exists = db.data.users.some((user) => user.username === username);
  res.json({ isDuplicated: exists });
});

app.post("/api/check-username", (req, res) => {
  const { username } = req.body;
  const exists = db.data.users.some((user) => user.username === username);
  res.json({ isDuplicated: exists });
});

app.post("/api/check-email", (req, res) => {
  const { email } = req.body;
  const exists = db.data.users.some((user) => user.email === email);
  res.json({ isDuplicated: exists });
});

// 로그인 API
app.get("/login", async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: "아이디와 비밀번호를 입력해주세요." });
  }

  const user = db.data.users.find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password
  );

  if (user) {
    res.json({
      message: "로그인 성공",
      userId: user.id,
      nickname: user.nickname,
    });
  } else {
    res
      .status(401)
      .json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

// 250410 google 로그인 추가

// 세션 설정
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 사용자 정보 직렬화/역직렬화
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google OAuth 전략 설정
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("구글 프로필:", profile);
      return done(null, profile);
    }
  )
);

// 인증 시작
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 인증 완료 후 콜백
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    }),
    // 성공 후 리디랙션이 안되서 다른 방법사용
//     successRedirect: "http://localhost:3000/landing-page", // 성공 후 리디렉션할 주소
  (req,res) => {
      const nickname = req.user.displayName; //nickname 대신 name 사용
      console.log("구글 사용자 닉네임",nickname);
      res.redirect(`http://localhost:3000/landing-page?nickname=${encodeURIComponent(nickname)}`);
      }
);

// 로그인 성공 후 사용자 확인용
// app.get("/landing-page", (req, res) => {
//   res.send("로그인 성공! 환영합니다.");
// });

// 구글로 로그인한 정보 로그아웃
app.get("/logout", (req,res) => {
    req.logout(()=> {
        res.redirect("http://localhost:3000/login-page");
        });
    });

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});

// 20250413 게시글 목록, 작성, 수정, 상세보기 API 만들기

// 글 목록 보기
app.get("/posts", (req,res) => {
    res.json(db.data.posts);
})

// 글 작성
app.post("/posts", async (req,res) => {
    try{
    const {title, content, author } = req.body;
    console.log("받은 요청",req.body);

    if(!title || !content || !author) {
        return res.status(400).json({error: "모든 필드를 입력하세요."});
        }
    const newPost = {
        id: Date.now(),
        title,
        content,
        author,
        createdAt : new Date().toISOString()
        };

    db.data.posts.push(newPost);
    await db.write();

    console.log("게시글 저장 완료",newPost);

    res.status(201).json({ message: "게시글이 등록되었습니다.", post: newPost });
    }catch (error) {
        console.error("글 작성 오류 발생",error);
        res.status(500).json({error:"서버에 오류 발생"});
        }
});

// 글 수정
app.put("/posts/:id", async (req,res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    await db.read();
    const postIndex = db.data.posts.findIndex((post) => post.id === postId);

    if(postId === -1) {
        return res.status(404).json({message: "게시글을 찾을 수 없습니다."});
    };

    db.data.posts[postIndex] = {
        ...db.data.posts[postIndex],
        title: title || db.data.posts[postIndex].title,
        content: content || db.data.posts[postIndex].content,
        updatedAt: new Date().toISOString(),
    };

    await db.write();
    res.json({message: "게시글이 수정되었습니다. 수정완료"});
});





























