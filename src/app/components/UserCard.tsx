import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/logto";

export default async function UserCard() {
	const { claims } = await getLogtoContext(logtoConfig);
	return (
		<div className="card bg-gray-700 w-full p-4 md:p-6">
			<div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
				<img className="rounded-full w-20 h-20" src={claims?.picture as string} alt="Avatar" />
				<div className="flex flex-col justify-center">
					<div className="flex flex-col md:flex-row items-center gap-2">
						<p className="text-white text-2xl md:text-3xl font-bold">{claims?.name}</p>
						<p className="text-sm text-primary">UID {claims?.sub}</p>
					</div>
					<p className="text-white text-base md:text-lg mt-1">{claims?.email}</p>
				</div>
			</div>
		</div>
	);
}
