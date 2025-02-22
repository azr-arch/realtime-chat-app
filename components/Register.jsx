"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { toast } from "react-hot-toast";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;

        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Registered successfully. go to login page");
                setLoading(false);
                setFormData((prev) => ({ ...prev, email: "", password: "" }));
                return;
            }

            throw new Error(data.message);
        } catch (err) {
            console.log("[REGISTERING_USER_CLIENT]:", err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className=" mt-[10vh] bg-primary md:max-w-login mx-auto md:h-auto md:max-h-login px-5 md:side-p rounded-3xl border border-solid border-gray pt-[3.15rem] pb-1">
                <h1 className="font-bold w-4/5 md:w-auto text-lg  leading-normal mb-7 text-heading">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="self-stretch flex flex-col items-start mb-8"
                >
                    <div className="grid gap-2 self-stretch">
                        <div className="grid gap-1 ">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                className="bg-transparent text-white"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={loading}
                                name="email"
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
                                className="bg-transparent text-white"
                                id="password"
                                placeholder="password"
                                type="password"
                                name="password"
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
                            className="text-accent_1  hover:outline mt-4"
                        >
                            {loading ? "Please Wait..." : "Register "}
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
