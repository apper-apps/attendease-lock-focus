import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-error-100 to-error-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="h-8 w-8 text-error-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </Card>
  );
};

export default Error;