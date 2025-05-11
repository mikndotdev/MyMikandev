import { getLogtoContext, signOut } from "@logto/next/server-actions";
import Link from "next/link";
import { logtoConfig } from "@/logto";

import { CiLogout, CiHome, CiEdit, CiSettings, CiMoneyBill } from "react-icons/ci";

export default async function ActionBar() {
	const { claims } = await getLogtoContext(logtoConfig, {
		fetchUserInfo: true,
	});

	return (
		<div
			className={
				"w-11/12 bg-neutral h-16 rounded-lg fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-between px-5 shadow-md drop-shadow-lg"
			}
		>
			<div className="flex items-center gap-2">
				<img
					className="rounded-full object-cover w-10 h-10"
					src={claims?.picture as string}
					alt="User Avatar"
				/>
				<div className="tooltip tooltip-info" data-tip={`UID ${claims?.sub}`}>
					<div className={"flex flex-col justify-left ml-3"}>
						<p className="text-white text-base font-bold text-md">{claims?.name}</p>
						<p className="text-white text-sm">{claims?.email}</p>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<div className="divider divider-horizontal h-11/12" />
				<Link href={"/dashboard"}>
					<button className="btn btn-ghost">
						<CiHome className="text-white w-5 h-5" />
					</button>
				</Link>
				<Link href={"/dashboard/info"}>
					<button className="btn btn-ghost">
						<CiEdit className="text-white w-5 h-5" />
					</button>
				</Link>
				<Link href={"/dashboard/setings"}>
					<button className="btn btn-ghost">
						<CiSettings className="text-white w-5 h-5" />
					</button>
				</Link>
				<Link href={"/dashboard/billing"}>
					<button className="btn btn-ghost">
						<CiMoneyBill className="text-white w-5 h-5" />
					</button>
				</Link>
				<div className="divider divider-horizontal h-11/12" />
			</div>
			<div className="flex items-center">
				<button
					className="btn btn-ghost"
					onClick={async () => {
						"use server";
						await signOut(logtoConfig);
					}}
				>
					<CiLogout className="text-white w-5 h-5" />
				</button>
			</div>
		</div>
	);
}
