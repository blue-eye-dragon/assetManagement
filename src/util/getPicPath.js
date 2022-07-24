export default function getPicPath (num) {
  console.log(num);
  return require(`../assets/picPath/${num}.jpg`)
}