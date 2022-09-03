import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import Box from './Box'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
    const scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(200, 500, 300)
    scene.add(directionalLight)

    const aspectRatio = window.innerWidth / window.innerHeight
    const cameraWidth = 150;
    const cameraHeight = cameraWidth / aspectRatio

    const camera = new THREE.OrthographicCamera(
        cameraWidth / 2, //left
        cameraWidth / 2, //right
        cameraHeight / 2,//top
        cameraHeight / -2, //bottom
        0, //near plane clipping
        100 // far plane clipping
    )

    camera.position.set(200, 200, 200)
    camera.lookAt(0, 10, 0)

    const renderer = new THREE.WebGL1Renderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)





    function createWheels() {
        const geometry = new THREE.BoxGeometry(12, 12, 33)
        const material = new THREE.MeshLambertMaterial({ color: 0x333333 })
        return (new THREE.Mesh(geometry, material))
    }

    function createCar() {
        const car = new THREE.Group()

        const backWheel = createWheels()
        backWheel.position.y = 6
        backWheel.position.x = -18
        car.add(backWheel)

        const frontWheel = createWheels()
        frontWheel.position.y = 6
        frontWheel.position.x = 18
        car.add(frontWheel)

        const main = new THREE.Mesh(
            new THREE.BoxGeometry(60, 15, 30),
            new THREE.MeshLambertMaterial({ color: 0x78b14b })
        )
        main.position.y = 12
        car.add(main)

        const cabin = new THREE.Mesh(
            new THREE.BoxGeometry(33, 12, 24),
            new THREE.MeshLambertMaterial({ color: 0xffffff })
        )
        cabin.position.x = -6
        cabin.position.y = 25.5
        car.add(cabin)

        return car

    }

    const car = createCar()

    scene.add(car)

    let r = renderer.render(scene, camera)
    console.log(r);


    return (<div>
        <h2>It's supposed to be down there!</h2>
        <Canvas>
            <OrbitControls enableZoom={false}/>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Box />
        </Canvas>
        {/* {renderer.render(scene,camera).domElement} */}
    </div>)
}