import { getConfig } from "./config"

const boot = () => {
  const config = getConfig()
  console.log(config)
}

export default boot
