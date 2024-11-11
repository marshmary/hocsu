import { Tooltip } from "flowbite-react";
import { motion } from "framer-motion";
import { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Icon from "~/components/Icon";
import { handleLogout } from "~/utils/logout";

interface FabProps {}

const Fab: FunctionComponent<FabProps> = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();
    const location = useLocation();
    var actions: FloatingButtonAction[] = [
        {
            label: "Logout",
            icon: "right-from-bracket",
            onClick: () => {
                // handle Logout
                handleLogout();
            },
        },
        {
            label: "How to use",
            icon: "book",
            onClick: () => {
                navigate("/guide");
            },
        },
    ];

    actions = !location.pathname.startsWith("/admin")
        ? actions.concat([
              {
                  label: "Admin",
                  icon: "folder",
                  onClick: () => {
                      navigate("/admin");
                  },
              },
          ])
        : actions.concat([
              {
                  label: "Home",
                  icon: "home",
                  onClick: () => {
                      navigate("/");
                  },
              },
          ]);

    return (
        <ul
            className={`fixed right-[30px] bottom-[30px] w-14 flex flex-col-reverse items-center gap-4 ${
                !open ? "max-h-56" : "max-h-max"
            }`}
        >
            <motion.div
                whileHover={{
                    scale: 1.05,
                }}
            >
                <li
                    className="w-[50px] h-[50px] rounded-full drop-shadow-md cursor-pointer grid place-items-center bg-[#cd595a] hover:bg-[#C33A3D] transition ease-in duration-200"
                    onClick={handleClick}
                >
                    <Icon icon="lightbulb" size="xl" className="text-white" />
                </li>
            </motion.div>
            {actions.reverse().map((action) => (
                <Tooltip
                    content={action.label}
                    placement="left"
                    key={action.label}
                >
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                    >
                        <li
                            className={`w-10 h-10 rounded-full grid place-items-center bg-[#cd595a] hover:bg-[#C33A3D] drop-shadow-md cursor-pointer transition ease-in-out duration-1000 delay-75 ${
                                !open ? "scale-0 hidden" : "scale-1 block"
                            }`}
                            onClick={action.onClick}
                        >
                            <Icon
                                icon={`${action.icon}`}
                                className="text-white"
                            />
                        </li>
                    </motion.div>
                </Tooltip>
            ))}
        </ul>
    );
};

export default Fab;
