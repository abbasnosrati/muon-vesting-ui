import * as React from "react";
import { FC } from "react";
import { Scale } from "../../animations";
import { AnimatePresence } from "framer-motion";

const Modal: FC<{
  closeable?: boolean;
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  isOpen: boolean;
  children: React.ReactNode;
  closeModalHandler: () => void;
}> = ({
  title,
  children,
  size,
  isOpen,
  closeModalHandler,
  className,
  closeable = true,
}) => {
  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <div
            className={`fixed z-[1000] left-0 top-0 w-full h-full backdrop-blur-sm flex items-center justify-center bg-[#00000033] ${className}`}
            onClick={(_e) => closeModalHandler()}
            data-testid="modal-wrapper"
          >
            <Scale
              className={`modal-content ${
                size === "lg" ? "max-w-[466px]" : "max-w-[400px]"
              } w-[90%] px-4 md:px-8 pt-5 pb-4 md:pb-8 relative -z-10 ${
                size === "sm" ? "bg-sectionBg pb-0" : ""
              } `}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                data-testid="modal-content"
              >
                <div className="modal-header flex justify-between items-center mb-6">
                  <p
                    className={`dark:text-white ${
                      size === "lg"
                        ? "text-lg font-bold"
                        : "font-medium text-sm"
                    }`}
                  >
                    {title}
                  </p>
                  {closeable && (
                    <img
                      className="cursor-pointer hidden dark:flex"
                      onClick={closeModalHandler}
                      src={"/assets/images/white-icon.svg"}
                      width="14px"
                      height="14px"
                      alt={"x"}
                    />
                  )}
                  {closeable && (
                    <img
                      className="cursor-pointer dark:hidden"
                      onClick={closeModalHandler}
                      src={
                        size === "sm"
                          ? "/assets/images/exit-dark-icon.svg"
                          : "/assets/images/exit-white-icon.svg"
                      }
                      width="14px"
                      height="14px"
                      alt={"x"}
                    />
                  )}
                </div>
                <div className="styled-scroll overflow-y-auto z-10 bg-gray20 max-h-[70vh]">
                  {children}
                </div>
              </div>
            </Scale>
          </div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Modal;
