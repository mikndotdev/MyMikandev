import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/logto";
import { CreatePaymentAccountButton } from "@/app/components/CreatePaymentAccountButton";

import Link from "next/link";

import PolarLogo from "@/app/assets/img/polar.png";

export default async function PaymentAccountCard() {
	const { userInfo } = await getLogtoContext(logtoConfig, {
		fetchUserInfo: true,
	});

	return (
		<div className="card w-full bg-neutral">
			<div className="card-body">
				<div className={"flex flex-row items-center space-x-3"}>
					<h2 className={"font-bold text-xl"}>Payment Account</h2>
					<div className="tooltip tooltip-info" data-tip={"Merchant of Record services by Polar"}>
						<img src={PolarLogo.src} alt="Polar Logo" className="h-5" />
					</div>
				</div>
				<div className={"flex flex-row space-x-3"}>
					{/* @ts-ignore */}
					{userInfo?.custom_data.polar_cid ? (
						<Link href={"/dashboard/billing/portal"} target="_blank" rel="noopener noreferrer">
							<button className="btn btn-primary">Open Customer Portal</button>
						</Link>
					) : (
						<CreatePaymentAccountButton />
					)}
				</div>
			</div>
		</div>
	);
}
