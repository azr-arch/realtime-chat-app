"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

import { toast } from "react-hot-toast";
import { useSocket } from "@context/SocketContext";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { socket } = useSocket();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res.error) {
                setLoading(false);
                toast.error("Invalid credentials");
                return;
            }
            socket?.emit("REGISTER", { email: formData.email });
            localStorage.setItem("UserEmail", JSON.stringify(formData.email));
            toast.success("Login successfully");
            //if everything goes well
            router.replace("/chat");
        } catch (error) {
            console.log("an error occured while logging ", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-md mx-auto bg-primary mt-[10vh] side-p rounded-3xl border border-solid border-gray px-4 pt-10 pb-[2.69rem] ">
            <h1 className="text-heading font-bold text-lg leading-normal mb-7">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={loading}
                            name="email"
                            className="bg-transparent text-white"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            name="password"
                            className="bg-transparent text-white"
                            disabled={loading}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <Button
                        disabled={loading}
                        variant="default"
                        className="text-accent_1 mt-4 hover:outline transition"
                    >
                        {loading ? "Please Wait..." : "Login "}
                    </Button>
                </div>
            </form>

            {/* <p className="text-l-gray mt-4 text-sm text-center leading-normal mb-6">
                or continue with these social profile
            </p>

            <div className="flex items-center justify-center gap-[1.3rem] mb-7">
                <span
                    onClick={() => signIn("google", { callbackUrl: "/profile" })}
                    role="button"
                    aria-label="Sign in with Google"
                >
                    <svg
                        width="43"
                        height="43"
                        viewBox="0 0 43 43"
                        fill="none"
                        data-type="google"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="21.8826" cy="21.5981" r="20.5" stroke="#828282" />
                        <path
                            d="M21.91 15.8883C23.7953 15.8883 25.5006 16.8557 26.478 18.1887L28.7945 15.8556C27.409 14.054 24.7425 12.6255 21.91 12.6255C16.9505 12.6255 12.8828 16.6388 12.8828 21.5983C12.8828 26.5578 16.9505 30.5711 21.91 30.5711C26.0213 30.5711 29.4797 27.8141 30.5402 24.0454C30.7685 23.2622 30.8828 22.4465 30.8828 21.5983V20.7826H22.7257V24.0448H27.049C26.1517 25.97 24.1776 27.3083 21.91 27.3083C18.7614 27.3083 16.1457 24.7469 16.1457 21.5983C16.1457 18.4497 18.7614 15.8883 21.91 15.8883Z"
                            fill="#828282"
                            className=""
                        />
                    </svg>
                </span>

                <span
                    onClick={() => signIn("facebook", { callbackUrl: "/profile" })}
                    role="button"
                    aria-label="Sign in with Facebook"
                >
                    <svg
                        width="43"
                        height="43"
                        viewBox="0 0 43 43"
                        fill="none"
                        data-type="facebook"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="21.8088" cy="21.5981" r="20.5" stroke="#828282" />
                        <g clipPath="url(#clip0)">
                            <path
                                d="M28.7963 13.4419H16.0697C14.6159 13.4419 13.433 14.596 13.433 16.0143V28.4305C13.433 29.8488 14.6159 31.0029 16.0697 31.0029H21.3783V24.7948H19.2689V21.7079H21.3783V19.6157C21.3783 17.9135 22.7976 16.5288 24.5424 16.5288H27.7416V19.6157H24.5424V21.7079H27.7416L27.2142 24.7948H24.5424V31.0029H28.7963C30.25 31.0029 31.433 29.8488 31.433 28.4305V16.0143C31.433 14.596 30.25 13.4419 28.7963 13.4419Z"
                                fill="#828282"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect
                                    width="18"
                                    height="17.561"
                                    fill="white"
                                    transform="translate(13.433 13.4419)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                <span
                    onClick={() => signIn("twitter", { callbackUrl: "/profile" })}
                    role="button"
                    aria-label="Sign in with Github"
                >
                    <svg
                        data-type="twitter"
                        width="43"
                        height="43"
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="21.7351" cy="21.5981" r="20.5" stroke="#828282" />
                        <g clipPath="url(#clip0)">
                            <path
                                d="M19.4503 29.8258C18.672 29.8258 17.8708 29.7627 17.0648 29.6364C15.6452 29.4137 14.2082 28.6711 13.8016 28.4488L12.7351 27.8657L13.8898 27.486C15.152 27.071 15.9198 26.8135 16.8702 26.4103C15.9185 25.9494 15.185 25.1203 14.832 24.0486L14.5634 23.2332L14.7836 23.2668C14.5748 23.0563 14.4098 22.8426 14.282 22.6483C13.8273 21.9577 13.5865 21.1138 13.6378 20.3906L13.6883 19.6788L14.1144 19.8439C13.9347 19.5044 13.8048 19.1419 13.7284 18.7619C13.5423 17.8352 13.6981 16.8507 14.167 15.9898L14.5382 15.3084L15.0347 15.9046C16.6048 17.7907 18.5934 18.9095 20.9537 19.2371C20.8573 18.5725 20.9295 17.9312 21.1686 17.3563C21.447 16.687 21.9422 16.1194 22.6002 15.7149C23.3311 15.2656 24.2174 15.048 25.0959 15.102C26.028 15.1592 26.8742 15.5084 27.5463 16.1126C27.8745 16.0273 28.1163 15.9362 28.4432 15.8132C28.6398 15.7392 28.8628 15.6551 29.1419 15.559L30.1702 15.2047L29.4996 17.1199C29.5438 17.1162 29.5894 17.113 29.6371 17.1109L30.7352 17.0612L30.0862 17.9482C30.0489 17.999 30.0395 18.0135 30.0263 18.0334C29.974 18.1122 29.9089 18.2102 29.018 19.3998C28.795 19.6977 28.6836 20.0856 28.7044 20.4924C28.7833 22.0381 28.5937 23.4367 28.1404 24.649C27.7116 25.796 27.0472 26.7801 26.1658 27.574C25.0752 28.5562 23.6845 29.2287 22.0321 29.5725C21.2216 29.7412 20.3512 29.8258 19.4503 29.8258V29.8258Z"
                                fill="#828282"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect
                                    width="18"
                                    height="17.9999"
                                    fill="white"
                                    transform="translate(12.7351 13.4419)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                <span
                    onClick={() => signIn("github", { callbackUrl: "/profile" })}
                    role="button"
                    aria-label="Sign in with Twitter"
                >
                    <svg
                        data-type="github"
                        width="43"
                        height="43"
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="21.6614" cy="21.5981" r="20.5" stroke="#828282" />
                        <g clipPath="url(#clip0)">
                            <path
                                d="M22.2855 13.4419C17.3422 13.4419 13.2855 17.4986 13.2855 22.4419C13.2855 26.6602 16.2455 30.4921 20.1761 31.4419V28.4643C19.7867 28.5496 19.4283 28.5521 19.0318 28.4352C18.4999 28.2782 18.0677 27.9239 17.7469 27.3837C17.5424 27.0387 17.18 26.6646 16.802 26.6921L16.7093 25.6415C17.5268 25.5715 18.234 26.1396 18.6539 26.8449C18.8403 27.1586 19.055 27.3425 19.3305 27.4238C19.5968 27.5022 19.8827 27.4646 20.2158 27.3469C20.2995 26.6799 20.605 26.4302 20.8359 26.0786V26.0781C18.4917 25.7285 17.5574 24.4848 17.1866 23.5032C16.6953 22.1998 16.9589 20.5715 17.8278 19.5425C17.8447 19.5224 17.8752 19.47 17.8634 19.4333C17.465 18.2299 17.9505 17.2344 17.9683 17.1288C18.4281 17.2647 18.5028 16.992 19.9655 17.8806L20.2183 18.0325C20.3241 18.0956 20.2908 18.0596 20.3966 18.0516C21.0073 17.8857 21.6511 17.7941 22.2854 17.7859C22.9245 17.7941 23.5642 17.8857 24.2002 18.0583L24.282 18.0666C24.2749 18.0655 24.3043 18.0614 24.3536 18.032C26.1807 16.9252 26.1151 17.287 26.6051 17.1277C26.6228 17.2334 27.1018 18.2451 26.7077 19.4333C26.6545 19.597 28.2917 21.0962 27.3843 23.5028C27.0135 24.4848 26.0794 25.7285 23.7352 26.0781V26.0786C24.0356 26.5366 24.3967 26.7803 24.3948 27.7251V31.4419C28.3255 30.4921 31.2854 26.6602 31.2854 22.4419C31.2855 17.4986 27.2288 13.4419 22.2855 13.4419V13.4419Z"
                                fill="#828282"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect
                                    width="18"
                                    height="18"
                                    fill="white"
                                    transform="translate(13.2855 13.4419)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
            </div> */}
        </section>
    );
};

export default Login;
