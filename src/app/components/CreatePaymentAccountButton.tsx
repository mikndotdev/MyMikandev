"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createPaymentAccount } from "@/app/actions/createPaymentAccount";

export const CreatePaymentAccountButton = () => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleCreate = async () => {
		toast.info("Creating payment account... You will be redirected in a moment.");
		setOpen(false);
		setLoading(true);
		try {
			const url = await createPaymentAccount();
			window.open(url, "_blank");
			window.location.reload();
		} catch (err) {
			setLoading(false);
			toast.error("Failed to create payment account. If this persists, contact support.");
		}
	};

	return (
		<main>
			<dialog className={"modal"} open={open}>
				<div className="modal-box justof-center items-center">
					<h1 className={"text-xl text-center"}>Third-party service disclaimer</h1>
					<p className={"text-left mt-2 text-sm"}>
						Our payments are handled by Polar, a third-party Merchant of Record. By clicking "Continue", you
						agree to their{" "}
						<a
							href="https://polar.sh/legal/terms"
							target="_blank"
							className={"link"}
							rel="noopener noreferrer"
						>
							terms of service
						</a>{" "}
						and{" "}
						<a
							href="https://polar.sh/legal/privacy"
							target="_blank"
							className={"link"}
							rel="noopener noreferrer"
						>
							{" "}
							privacy policy
						</a>
						.
					</p>
					<div className={"modal-bottom mt-5 flex flex-row space-x-2"}>
						<button className="btn btn-error" onClick={() => setOpen(false)} disabled={loading}>
							Cancel
						</button>
						<button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
							Continue
						</button>
					</div>
				</div>
			</dialog>
			<button className="btn btn-primary" onClick={() => setOpen(true)} disabled={loading}>
				{loading && <span className={"loading loading-spinner"} />}
				Create Account
			</button>
		</main>
	);
};
