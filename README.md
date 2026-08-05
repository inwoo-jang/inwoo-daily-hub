# Daily Hub

오늘 하루를 가볍게 시작하는 대시보드입니다.
날씨 · 운세 · 심리테스트 · 게임을 한 화면에서 보고, 결과를 내 기록으로 남깁니다.

- 배포 주소 : https://inwoo-jang.github.io/inwoo-daily-hub/
- 만든 사람 : 장인우 (SKALA)

---

## 무엇이 들어 있나

| 화면 | 주소 | 하는 일 |
| --- | --- | --- |
| 홈 | `/` | 지금 날씨 · 행운지수 · 포춘쿠키 · 바로가기 |
| 날씨 | `/weather` | 전국 도시 현황, 도시별 시간대 예보 |
| 운세 | `/tarot` | 타로 세 장으로 보는 오늘 (오늘의 운세 · 솔로연애운 · 커플연애운) |
| 테스트 | `/tests` | 영혼 동물 · 좀비 사태 생존 역할 (룰 기반 채점) |
| 게임 | `/games` | 룰렛 돌리기 · 로또 번호 뽑기 |
| My | `/records` | 남긴 기록 (운세 · 테스트 · 게임) — 로그인 필요 |
| 환경 설정 | `/settings` | 테마 |

## 실행

```bash
npm install
npm run dev:all     # 화면(5173) + Mock API(3001) 를 같이 띄운다
```

따로 띄우고 싶다면:

```bash
npm run dev         # 화면만
npm run api         # Mock API 만
```

`npm run dev:all` 은 3001 포트가 이미 쓰이고 있으면 API 를 건너뛰고 화면만 띄웁니다.
그때는 아래 "서버가 없을 때" 규칙으로 로그인과 기록이 그대로 동작합니다.

## 로그인 계정 (Mock)

| 이메일 | 비밀번호 |
| --- | --- |
| `student@skala.com` | `1234` |
| `admin@skala.com` | `admin1234` |

## 서버가 없을 때

GitHub Pages 는 파일만 내려 주는 곳이라 Node 서버가 붙을 자리가 없습니다.
그래서 배포본에서는 브라우저가 API 역할을 대신합니다.

- `mock-api/server.js` — 내 컴퓨터에서 도는 진짜 서버
- `src/final/data/fortuneBrowserApi.js` — 서버가 없을 때 같은 규칙으로 같은 답을 만드는 쪽

화면과 `fortuneApi.js` 는 둘 중 어느 쪽이 답하는지 모릅니다. axios 의 **어댑터만** 바꿔 끼웠기 때문입니다.
두 파일의 `validateRecord` 는 **같은 규칙이어야 합니다.** 한쪽만 고치면
로컬에서는 막히던 값이 배포본에서만 저장되는 일이 생깁니다.

기록은 `localStorage` 에 남고 서버로 나가지 않습니다.

## 폴더

```
src/
  final/            결과물 본체 (화면 · 데이터 · 주소표)
    views/          홈 · 날씨 · 운세 · 테스트 · 게임 · My · 로그인
    data/           타로 · 심리테스트 · 룰렛 세트 · 포춘쿠키 문구
    utils/          결과 카드 그리기(캔버스)
  components/weather/  날씨 카드 · 아이콘 · 배경 연출
  stores/           로그인 · 기록 · 환경설정 (Pinia)
mock-api/           로컬 Mock 서버
자료/                 화면에 쓴 원본 이미지와 문항 원본
```

## 배포

```bash
npm run deploy      # 빌드 → gh-pages 브랜치로 올림
```

`vite.config.js` 의 `base` 가 `/inwoo-daily-hub/` 라서 GitHub Pages 하위 경로에서도 링크가 맞습니다.
새로고침 시 404 가 나지 않도록 `index.html` 을 `404.html` 로 복사해 함께 올립니다.
