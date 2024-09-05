export const initialMessages = (name: string) => [
  {
    text: `안녕! 나는 ${name}의 동화 만들기를 도와줄 달콩이야.`,
    isUser: false
  },
  {
    text: `앞으로 내가 이야기를 짧게 만들면 ${name}이가 뒤에 이어질 이야기를 자유롭게 보내주면 돼!`,
    isUser: false
  },
  {
    text: `${name}아 동화 만들 준비가 되었니?`,
    isUser: false
  }
];

export const initialChoices = ["응, 준비됐어", "아니"];
export const finalChoices = ["메인 홈으로 돌아가기", "동화 이어서 만들기"];
export const nextChoices = ["다음으로"];

export const notReadyMessage = {
  text: "그럼 동화 만들 준비가 되었을 때 나를 다시 불러줘!",
  isUser: false
};

export const startStoryMessage = {
  text: "그럼 내가 먼저 동화를 만들어볼게",
  isUser: false
};
