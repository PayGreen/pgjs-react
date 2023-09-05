import React from "react";

interface SkeletonProps {
  children?: any;
}

export const PaymentContainer = ({ children }: SkeletonProps) => (
  <div id="paygreen-container">{children}</div>
);
export const MethodsContainer = ({ children }: SkeletonProps) => (
  <div id="paygreen-methods-container">{children}</div>
);
export const CvvContainer = ({ children }: SkeletonProps) => (
  <div id="paygreen-cvv-frame">{children}</div>
);
export const ExpContainer = ({ children }: SkeletonProps) => (
  <div id="paygreen-exp-frame">{children}</div>
);
export const PanContainer = ({ children }: SkeletonProps) => (
  <div id="paygreen-pan-frame">{children}</div>
);
