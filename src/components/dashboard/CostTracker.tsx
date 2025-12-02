'use client';

import React from 'react';

interface CostTrackerProps {
    budgetCap: number;
    budgetUsed: number;
}

export default function CostTracker({ budgetCap, budgetUsed }: CostTrackerProps) {
    const percentage = Math.min((budgetUsed / budgetCap) * 100, 100);
    const isNearLimit = percentage > 80;
    const isOverLimit = percentage >= 100;

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">AI Budget Usage</h3>
                <span className="text-xs font-mono text-gray-500">
                    ${budgetUsed.toFixed(2)} / ${budgetCap.toFixed(2)}
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${isOverLimit ? 'bg-red-600' : isNearLimit ? 'bg-yellow-500' : 'bg-blue-600'
                        }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {isOverLimit && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                    Budget cap reached. AI features paused.
                </p>
            )}
        </div>
    );
}
