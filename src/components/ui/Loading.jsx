import React from "react";
import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 skeleton rounded-lg"></div>
          <div className="h-4 w-32 skeleton rounded"></div>
        </div>
        <div className="h-10 w-24 skeleton rounded-lg"></div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 skeleton rounded"></div>
                <div className="h-8 w-16 skeleton rounded"></div>
                <div className="h-3 w-12 skeleton rounded"></div>
              </div>
              <div className="h-12 w-12 skeleton rounded-full"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main content skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 w-32 skeleton rounded"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 skeleton rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 skeleton rounded"></div>
                  <div className="h-3 w-48 skeleton rounded"></div>
                </div>
                <div className="h-8 w-20 skeleton rounded-full"></div>
                <div className="h-8 w-24 skeleton rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Loading;