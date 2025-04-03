import { useGLTF } from "@react-three/drei"
import { forwardRef } from "react"

const ExtrudedLogoGLB = forwardRef(({ name }, ref) => {
  const fileName = name.toLowerCase().replace(/[\s.]/g, "")
  const { scene } = useGLTF(`/renders/${fileName}.glb`)

  return <primitive object={scene} ref={ref} scale={0.6} position={[0, 2.1, 0]} />
})

export default ExtrudedLogoGLB