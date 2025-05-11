import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/logto";
import { redirect } from "next/navigation";
import Image from "next/image";

import { FaGoogle, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

import PaymentAccountCard from "@/app/components/PaymentAccountCard";

export default async function Dashboard() {
	const { claims, isAuthenticated, userInfo } = await getLogtoContext(logtoConfig, {
		fetchUserInfo: true,
	});

	if (!isAuthenticated) {
		await redirect("/");
	}

	return (
		<main className="flex min-h-screen flex-col py-4 max-w-11/12 mx-auto">
			<div className="w-full justify-center items-center">
				<h1 className="text-primary text-3xl font-bold text-center">User Info</h1>
			</div>
			<div className="flex flex-col space-y-5 py-5">
				<div className="flex flex-row space-x-5">
					<div className="card w-full bg-neutral">
						<div className="card-body">
							<h2 className={"font-bold text-xl"}>Username</h2>
							<p className="text-lg text-white">{userInfo?.name ?? "N/A"}</p>
						</div>
					</div>
					<div className="card w-full bg-neutral">
						<div className="card-body">
							<h2 className={"font-bold text-xl"}>E-mail</h2>
							<p className="text-lg text-white">{userInfo?.email ?? "N/A"}</p>
						</div>
					</div>
				</div>
				<div className="card w-full bg-neutral">
					<div className="card-body">
						<h2 className={"font-bold text-xl"}>Social Logins</h2>
						<div className={"flex flex-row justify-center items-center space-x-2"}>
							<FaDiscord className="text-lg text-white" />
							{userInfo?.identities?.discord ? (
								// @ts-ignore
								<p className="text-lg text-white">{userInfo.identities.discord.details.name}</p>
							) : (
								<p className="text-lg text-white">Not linked</p>
							)}
						</div>
						<div className={"flex flex-row justify-center items-center space-x-2"}>
							<FaGithub className="text-lg text-white" />
							{userInfo?.identities?.github ? (
								// @ts-ignore
								<p className="text-lg text-white">{userInfo.identities.github.details.name}</p>
							) : (
								<p className="text-lg text-white">Not linked</p>
							)}
						</div>
						<div className={"flex flex-row justify-center items-center space-x-2"}>
							<FaGoogle className="text-lg text-white" />
							{userInfo?.identities?.google ? (
								// @ts-ignore
								<p className="text-lg text-white">{userInfo.identities.github.details.name}</p>
							) : (
								<p className="text-lg text-white">Not linked</p>
							)}
						</div>
						<div className={"flex flex-row justify-center items-center space-x-2"}>
							<FaTwitter className="text-lg text-white" />
							{userInfo?.identities?.twitter ? (
								// @ts-ignore
								<p className="text-lg text-white">{userInfo.identities.twitter.details.name}</p>
							) : (
								<p className="text-lg text-white">Not linked</p>
							)}
						</div>
						<div className={"flex flex-row justify-center items-center space-x-2"}>
							<SiHuggingface className="text-lg text-white" />
							{userInfo?.identities?.huggingface ? (
								// @ts-ignore
								<p className="text-lg text-white">{userInfo.identities.huggingface.details.name}</p>
							) : (
								<p className="text-lg text-white">Not linked</p>
							)}
						</div>
					</div>
				</div>
				<PaymentAccountCard />
			</div>
		</main>
	);
}
