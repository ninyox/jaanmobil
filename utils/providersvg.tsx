import { MtnSvg, AirtelSvg, GloSvg, NineMobileSvg } from "@/assets/svg"

export default function ProviderSvg({ name }: { name: string }) {
  switch(name) {
    case 'mtn':
      return <MtnSvg />
    case 'airtel':
      return <AirtelSvg />
    case 'glo':
      return <GloSvg />
    case '9mobile':
      return <NineMobileSvg />
    default:
      return <MtnSvg />
  }
}