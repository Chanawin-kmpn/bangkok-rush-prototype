"use client";
import React from "react";
import Button from "./Button";

const PaginationControls = ({
	visibleCount,
	totalCount,
	initialCount,
	hasMore,
	onShowMore,
	onShowLess,
	itemLabel = "items",
	className = "",
}) => {
	if (totalCount === 0) return null;

	const canShowLess = visibleCount > initialCount;

	return (
		<div className={`text-center pt-8 self-center ${className}`}>
			{hasMore && (
				<>
					<Button className="mx-auto" label="Show More" onClick={onShowMore} />
					<div className="mt-3 text-sm text-gray-500">
						Showing {visibleCount + 3} of {totalCount} {itemLabel}
					</div>
				</>
			)}

			{!hasMore && totalCount > initialCount && (
				<>
					{canShowLess && (
						<Button
							className="mx-auto"
							label="Show Less"
							onClick={onShowLess}
						/>
					)}
					<div className="mt-2 text-sm text-gray-500">
						You&apos;ve seen all {totalCount} {itemLabel}
					</div>
				</>
			)}
		</div>
	);
};

export default PaginationControls;
