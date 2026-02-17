import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const VideoReel = () => {

    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const containerRef = useRef(null);
    const videoRefs = useRef([]);

    // ---------------- FETCH VIDEOS ----------------
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await api.get("/api/food");
                setVideos(response.data.foodItem);
                toast.success(response.data.message || "Videos loaded");
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to load videos");
            }
        };

        fetchVideos();
    }, []);

    // ---------------- SCROLL DETECT ----------------
    const handleScroll = () => {
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;
        const height = containerRef.current.clientHeight;
        const index = Math.round(scrollTop / height);

        setCurrentIndex(index);
    };

    // ---------------- AUTO PLAY ----------------
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === currentIndex) {
                video.play().catch(() => { });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [currentIndex, videos]);

    return (
        <>
            {/* ---------------- MOBILE VIEW ---------------- */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="md:hidden h-screen w-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar"
            >
                {videos.map((video, i) => (
                    <div key={video._id} className="h-screen w-screen snap-start bg-black relative">

                        <video
                            ref={(el) => (videoRefs.current[i] = el)}
                            src={video.video}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <h2 className="text-white text-xl font-bold">{video.name}</h2>
                                <span className="text-orange-400 font-bold text-lg">Food</span>
                            </div>

                            <p className="text-gray-200 text-sm line-clamp-2">{video.description}</p>

                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg">
                                Order Now
                            </button>
                        </div>

                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-semibold">
                            {i + 1} / {videos.length}
                        </div>
                    </div>
                ))}
            </div>


            {/* ---------------- DESKTOP VIEW ---------------- */}
            <div className="hidden md:flex justify-center items-center min-h-screen bg-gray-900">

                <div className="relative">

                    {/* Phone Body */}
                    <div className="bg-black rounded-[40px] p-2 shadow-2xl w-[420px] aspect-[16/28]">

                        {/* Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20" />

                        {/* Screen */}
                        <div
                            ref={containerRef}
                            onScroll={handleScroll}
                            className="h-full w-full rounded-[32px] overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar"
                        >
                            {videos.map((video, i) => (
                                <div key={video._id} className="h-full w-full snap-start relative">

                                    <video
                                        ref={(el) => (videoRefs.current[i] = el)}
                                        src={video.video}
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-white text-xl font-bold">{video.name}</h2>
                                            <span className="text-orange-400 font-bold text-lg">Food</span>
                                        </div>

                                        <p className="text-gray-200 text-sm line-clamp-2">{video.description}</p>

                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg">
                                            Order Now
                                        </button>
                                    </div>

                                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-semibold">
                                        {i + 1} / {videos.length}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black rounded-full" />
                </div>
            </div>
        </>
    );
};

export default VideoReel;
