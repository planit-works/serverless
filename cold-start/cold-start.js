let isWarmStart = false;

console.log('부팅 시 단 1회만 실행되는 코드!');

export const handler = async (event) => {
  if (!isWarmStart) {
    isWarmStart = true;
    return { status: 200, body: '콜드 스타트' };
  }
  return { status: 201, body: '웜 스타트' };
};
