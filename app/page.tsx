"use client";
import React from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import Lottie from "lottie-react-web";
import EarthAnimation from "../app/EarthAnimation.json";

export default function Home() {
    const [MousePosition, setMousePosition] = React.useState({x: 0, y: 0});
    React.useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            setMousePosition({x: e.clientX, y: e.clientY});
        })
    }, [])

    React.useEffect(() => {
        (
            async () => {
                //@ts-ignore
                const locomotiveScroll = (await import("locomotive-scroll")).default;
                const LocomotiveScroll = new locomotiveScroll();
            }
        )()
    }, [])


    const {scrollYProgress} = useScroll();
    const mainScrollY = useTransform(scrollYProgress, [0.17, 1], ["150vh", "0vh"]);
    const CoursellScroll = useTransform(scrollYProgress, [0.24, 0.6], ["50%", "-50%"]);
    return (
        <React.Fragment>
            <main
                style={{backgroundImage: `radial-gradient(circle farthest-side at ${MousePosition.x}px ${MousePosition.y}px, #47578c 0%, transparent 80%)`}}
                className={`bg-black text-white h-[300vh] min-w-screen`}>
                <Navbar/>

                <motion.div className={`relative pt-[45rem]`} animate={{scale: 1}} initial={{scale: 0}}
                            transition={{duration: 2}}>
                    <h1 className={`font-bold absolute left-[calc(50%-355px)] top-[calc(50%-180px)] -translate-y-1/2 -translate-x-1/2 text-[3rem] `}>
                        A Place,
                    </h1>
                    <h1 className={`absolute line-clamp-5  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center text-[10rem] font-bold leading-[10rem]`}>
                        Where Health Matters.
                    </h1>
                </motion.div>
                <motion.div animate={{y: 0}} initial={{y: 500}} transition={{duration: 1.5, ease: [0.83, 0, 0.17, 1]}}>
                    <div className={`w-[80%] left-1/2 absolute -translate-x-1/2 top-[20rem]`}>
                        <Lottie options={{animationData: EarthAnimation}}/>
                    </div>
                </motion.div>

                <motion.div style={{y: mainScrollY}}
                            className={`w-screen p-[5rem] absolute top-0 rounded-t-[5rem] bg-[#1c1c1c] border-t-4 border-white h-[300vh]`}>

                    <h1 className={`font-bold inline-block relative text-[5rem] my-10`}>Attributes:
                        <motion.div whileInView={{width: "100%"}} initial={{width: 0}} transition={{ease: [0.83, 0, 0.17, 1]}} className={`bg-white h-[10px] rounded-xl w-full`}/>
                    </h1>

                    {/*the coursell component*/}

                    <motion.div style={{left: CoursellScroll}}
                                className={`bg-[rgba(255,255,255,0.15)]  flex gap-[2rem] w-[170rem] p-5 rounded-[3rem] items-center relative `}>
                        <div className={`bg-white h-[25rem] rounded-[3rem] w-[40rem]`}/>
                        <div className={`bg-white h-[25rem] rounded-[3rem] w-[40rem]`}/>
                        <div className={`bg-white h-[25rem] rounded-[3rem] w-[40rem]`}/>
                        <div className={`bg-white h-[25rem] rounded-[3rem] w-[40rem]`}/>
                    </motion.div>
                </motion.div>
            </main>


        </React.Fragment>
    )
}


const Navbar = () => {
    const options = [
        {name: "Home", link: "/"},
        {name: "Dashboard", link: "/dashboard"},
        {name: "About Us", link: "/about"},
        {name: "Forums", link: "/forums"}
    ]

    const {scrollYProgress} = useScroll();

    const y = useTransform(scrollYProgress, [0, 0.2], ["-100px", "0px"]);
    return (
        <motion.nav style={{y}}
                    transition={{duration: 1}}
                    className={`flex fixed w-screen bg-[rgba(0,0,0,0.15)] text-[2rem] p-6 blur_it text-white justify-between items-center`}>
            <h1>CareMate</h1>
            <ul className={`flex gap-[1rem]`}>
                {options.map((item, index) => {
                    return <li
                        className={`hover:px-10 transition-all duration-700 cursor-default  border-x-2 hover:border-white border-transparent `}
                        key={index} onClick={() => window.location.assign(item.link)}>{item.name}</li>
                })}
            </ul>
        </motion.nav>
    )
}
