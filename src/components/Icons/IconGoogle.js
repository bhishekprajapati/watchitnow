import Image from "next/image";

export default function IconGoogle({ width = 16, height = 16 }) {
  return <Image width={width} height={height} src="/google.png" />;
}
