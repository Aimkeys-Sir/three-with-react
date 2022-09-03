// import {OrbitControls} from '@react-three/drei'

export default function Box() {
  return (
    <mesh rotation={[90,10,60]}>
        {/* <OrbitControls enableZoom={false}/> */}
      <boxBufferGeometry attach="geometry" args={[3,3,3]} />
      <meshLambertMaterial attach="material" color="blue" />
    </mesh>
  );
}