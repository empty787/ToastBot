exports.id = 377;
exports.ids = [377];
exports.modules = {

/***/ 7993:
/***/ ((module) => {

// Exports
module.exports = {
	"deleteButton": "styles_deleteButton__jTERY",
	"togglesContainer": "styles_togglesContainer__uKAL4",
	"item": "styles_item__7TJu_"
};


/***/ }),

/***/ 8654:
/***/ ((module) => {

// Exports
module.exports = {
	"textInput": "styles_textInput__f6j6T"
};


/***/ }),

/***/ 1260:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "styles_container__9re62",
	"innerContainer": "styles_innerContainer__aeSch",
	"label": "styles_label__LUz_l"
};


/***/ }),

/***/ 6163:
/***/ ((module) => {

// Exports
module.exports = {
	"select": "styles_select__0gRrt",
	"container": "styles_container__EDvFR",
	"placeholderWrapper": "styles_placeholderWrapper__X9p_J",
	"placeholder": "styles_placeholder__GqWTK",
	"rotate": "styles_rotate__NeDmy",
	"option": "styles_option__KaDgx",
	"options": "styles_options__cQa68"
};


/***/ }),

/***/ 2913:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "Button_button__J1uoJ",
	"icon": "Button_icon___qIj4"
};


/***/ }),

/***/ 1250:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "Card_card__3PaD8",
	"drop": "Card_drop__vz4Y4"
};


/***/ }),

/***/ 3926:
/***/ ((module) => {

// Exports
module.exports = {
	"header": "Header_header__SQD4u",
	"text": "Header_text__HEH9V",
	"open": "Header_open__Q71to",
	"subMenuHover": "Header_subMenuHover__f0GVq",
	"sidebar": "Header_sidebar__KHsqe"
};


/***/ }),

/***/ 4913:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar": "Sidebar_sidebar____dpn",
	"container": "Sidebar_container__3GRoj",
	"profile": "Sidebar_profile__dBuWF",
	"image": "Sidebar_image__Ew0F_",
	"text": "Sidebar_text__n5QvV",
	"name": "Sidebar_name___QchV",
	"id": "Sidebar_id__lfbXs",
	"serversMenuWrapper": "Sidebar_serversMenuWrapper__chzAo",
	"serversMenu": "Sidebar_serversMenu__E1h29",
	"server": "Sidebar_server__v2q_5",
	"invite": "Sidebar_invite__r5ygO",
	"links": "Sidebar_links__lAd6t",
	"content": "Sidebar_content__VUfBY"
};


/***/ }),

/***/ 3419:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Card_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1250);
/* harmony import */ var _styles_Card_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Card_module_scss__WEBPACK_IMPORTED_MODULE_2__);



function Card(props = {}) {
    const [opened, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.defaultOpened ?? false);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const myProps = {
        "data-size": props.size || "large",
        ...props
    };
    if (props.retractable) {
        myProps["data-retractable"] = true;
        if (opened) myProps["data-opened"] = true;
    }
    function toggle(event) {
        if (ref && [
            ...ref.current?.childNodes || []
        ].find((element)=>element.nodeName == "HEADER")?.contains(event.target)) {
            setOpen(!opened);
        }
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        ...myProps,
        className: `${(_styles_Card_module_scss__WEBPACK_IMPORTED_MODULE_2___default().card)} ${props?.className || ""}`.trim(),
        onClick: (e)=>toggle(e),
        ref: ref
    });
}
Card.Header = (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
        ...props
    });
Card.Content = (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        ...props
    });


/***/ }),

/***/ 7169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  cl: () => (/* reexport */ DashboardLayout),
  nS: () => (/* reexport */ GuildPermissions),
  B1: () => (/* reexport */ GuildPredefinedReason)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./utils/Utils.ts
var Utils = __webpack_require__(8539);
// EXTERNAL MODULE: ./styles/Sidebar.module.scss
var Sidebar_module = __webpack_require__(4913);
var Sidebar_module_default = /*#__PURE__*/__webpack_require__.n(Sidebar_module);
// EXTERNAL MODULE: ./components/dots.tsx
var dots = __webpack_require__(7174);
// EXTERNAL MODULE: ./hooks/useAPI.ts
var useAPI = __webpack_require__(3660);
;// CONCATENATED MODULE: ./utils/Constants.ts
const URLS = {
    USER: {
        general: [
            {
                label: "Home",
                url: "/dashboard/@me",
                icon: "fa-home"
            },
            {
                label: "Servidores",
                url: "/dashboard/guilds",
                icon: "fa-grip-vertical"
            }
        ]
    },
    GUILD: {
        general: [
            {
                label: "Home",
                url: "/dashboard/guilds/[guild]",
                icon: "fa-home"
            }
        ],
        moderation: [
            {
                label: "Modera\xe7\xe3o",
                url: "/dashboard/guilds/[guild]/moderation",
                icon: "fa-hammer"
            },
            {
                label: "Motivos Pre-Definidos",
                url: "/dashboard/guilds/[guild]/reasons",
                icon: "fa-sticky-note"
            },
            {
                label: "Embed de puni\xe7\xf5es",
                url: "/dashboard/guilds/[guild]/moderation/embed",
                icon: "fa-window-maximize"
            }
        ],
        permissions: [
            {
                label: "Permiss\xf5es",
                url: "/dashboard/guilds/[guild]/permissions",
                icon: "fa-briefcase"
            }
        ]
    }
};

;// CONCATENATED MODULE: ./components/dashboard/sidebar.tsx










function DashboardSidebar() {
    const [opened, setOpen] = (0,external_react_.useState)(false);
    const { user, guild, fetchUserGuilds } = (0,useAPI/* useAPI */.E)();
    const router = (0,router_.useRouter)();
    const urls = URLS[guild ? "GUILD" : "USER"];
    (0,external_react_.useEffect)(()=>{
        const serversMenu = document.querySelector(`.${(Sidebar_module_default()).serversMenuWrapper}`);
        const profile = document.querySelector(`.${(Sidebar_module_default()).profile}`);
        window.addEventListener("click", (e)=>{
            if (opened && !serversMenu.contains(e.target) && !profile.contains(e.target)) {
                setOpen(false);
            }
        });
        if (opened && !user.guilds) {
            fetchUserGuilds();
        }
    });
    const openedProps = opened ? {
        "data-opened": true
    } : {};
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("nav", {
        className: (Sidebar_module_default()).sidebar,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("header", {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: (Sidebar_module_default()).container,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (Sidebar_module_default()).profile,
                            ...openedProps,
                            onClick: ()=>setOpen(!opened),
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                    className: (Sidebar_module_default()).image,
                                    children: guild ? guild.icon ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                        src: Utils/* Utils */.c.getGuildIcon(guild, {
                                            size: 1024,
                                            dynamic: true
                                        }),
                                        alt: `#${guild.name}`
                                    }) : /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        children: Utils/* Utils */.c.stringAcronym(guild.name)
                                    }) : /*#__PURE__*/ jsx_runtime.jsx("img", {
                                        src: Utils/* Utils */.c.getUserAvatar(user),
                                        alt: `@${user?.username}`
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: (Sidebar_module_default()).text,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: (Sidebar_module_default()).name,
                                            children: guild?.name || user?.username
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: (Sidebar_module_default()).id,
                                            children: (guild || user)?.id
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("section", {
                            className: (Sidebar_module_default()).serversMenuWrapper,
                            ...openedProps,
                            children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: (Sidebar_module_default()).serversMenu,
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("li", {
                                            "data-selected": true,
                                            children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                href: "/dashboard/@me",
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    className: (Sidebar_module_default()).server,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                            className: (Sidebar_module_default()).image,
                                                            children: /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                                src: `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=2048`
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                            className: (Sidebar_module_default()).text,
                                                            children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                className: (Sidebar_module_default()).name,
                                                                children: user?.username
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("hr", {}),
                                        user?.guilds?.map((guild)=>/*#__PURE__*/ jsx_runtime.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                    href: `/dashboard/guilds/${guild.id}`,
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                        className: (Sidebar_module_default()).server,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                className: (Sidebar_module_default()).image,
                                                                children: guild.icon ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                                    src: Utils/* Utils */.c.getGuildIcon(guild, {
                                                                        size: 1024,
                                                                        dynamic: true
                                                                    })
                                                                }) : /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                                    children: Utils/* Utils */.c.stringAcronym(guild.name)
                                                                })
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                className: (Sidebar_module_default()).text,
                                                                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                    className: (Sidebar_module_default()).name,
                                                                    children: guild.name
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            }, guild.id)) ?? /*#__PURE__*/ jsx_runtime.jsx(dots/* Dots */.b, {}),
                                        /*#__PURE__*/ jsx_runtime.jsx("hr", {}),
                                        /*#__PURE__*/ jsx_runtime.jsx("li", {
                                            className: (Sidebar_module_default()).invite,
                                            children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                href: "/invite",
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    className: (Sidebar_module_default()).server,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                            className: (Sidebar_module_default()).image,
                                                            children: /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                                src: "https://imgur.com/xCIgS2n.png",
                                                                style: {
                                                                    borderRadius: "0"
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                            className: (Sidebar_module_default()).text,
                                                            children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                className: (Sidebar_module_default()).name,
                                                                children: "Invite"
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                })
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("ul", {
                className: (Sidebar_module_default()).links,
                children: Object.entries(urls).map(([category, urls], index)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                    children: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
                                })
                            }),
                            urls.map((url, index)=>/*#__PURE__*/ (0,external_react_.createElement)("li", {
                                    ...router.pathname == url.url ? {
                                        "data-selected": true
                                    } : {},
                                    key: `urls-${category}-${index}`
                                }, /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                    href: url.url.replace("[guild]", guild?.id),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                            className: `${router.pathname == url.url ? "fa" : "far"} ${url.icon}`
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            children: url.label
                                        })
                                    ]
                                })))
                        ]
                    }, `urls-${index}`))
            })
        ]
    });
}

// EXTERNAL MODULE: ./styles/Header.module.scss
var Header_module = __webpack_require__(3926);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
;// CONCATENATED MODULE: ./components/header.tsx



function Header() {
    (0,external_react_.useEffect)(()=>{
        const dropdowns = document.querySelectorAll("[data-dropdown]");
        dropdowns.forEach((dropdown)=>{
            dropdown.addEventListener("click", (e)=>{
                const classList = dropdown.classList;
                if (classList.toString().includes((Header_module_default()).open)) {
                    classList.remove((Header_module_default()).open);
                } else {
                    classList.add((Header_module_default()).open);
                }
            });
            document.addEventListener("click", ()=>{
                dropdown.classList.remove((Header_module_default()).open);
            });
        });
    }, []);
    return /*#__PURE__*/ jsx_runtime.jsx("header", {
        className: (Header_module_default()).header,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("li", {
                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                        href: "#",
                        children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                            className: "fas fa-home"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx("li", {
                    className: (Header_module_default()).sidebar,
                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                        href: "#",
                        children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                            className: "fas fa-bars"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx("li", {
                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                        href: "#",
                        children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                            className: "fab fa-discord"
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                    "data-dropdown": true,
                    className: "",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                            className: "fad fa-box-alt"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: (Header_module_default()).text,
                            children: "Features"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        href: "#",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            children: "Feature 1"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        href: "#",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            children: "Feature 2"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        href: "#",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            children: "Feature 3"
                                        })
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/dashboard/layout.tsx





class DashboardLayout extends (external_react_default()).Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log("a");
    }
    render() {
        const { children } = this.props;
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(DashboardSidebar, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                    className: (Sidebar_module_default()).content,
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(Header, {}),
                        children
                    ]
                })
            ]
        });
    }
}

// EXTERNAL MODULE: ./components/card.tsx
var card = __webpack_require__(3419);
// EXTERNAL MODULE: ./components/form/index.ts + 3 modules
var components_form = __webpack_require__(2888);
// EXTERNAL MODULE: ./components/dashboard/guilds/permissions/styles.module.scss
var styles_module = __webpack_require__(7993);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
;// CONCATENATED MODULE: ./components/dashboard/guilds/permissions/index.tsx






const GuildPermissions = (props)=>{
    const { guild } = (0,useAPI/* useAPI */.E)();
    return /*#__PURE__*/ jsx_runtime.jsx(card/* Card */.Z, {
        style: {
            backgroundColor: "var(--luny-background)",
            marginTop: "0",
            marginBottom: "20px"
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Z.Content, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    style: {
                        display: "flex"
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(components_form/* Select */.Ph, {
                            customId: "role",
                            options: [
                                ...guild?.roles || []
                            ].sort((a, b)=>b.position - a.position).map((role)=>({
                                    label: role.name,
                                    value: role.id,
                                    color: role.color ? `#${role.color.toString(16)}` : undefined
                                })) || [],
                            placeholder: "Select a role",
                            maxValues: 1,
                            backgroundColor: "var(--luny-backgroundSecondary)"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: (styles_module_default()).deleteButton,
                            children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                className: "fas fa-trash"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: (styles_module_default()).togglesContainer,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (styles_module_default()).item,
                            children: [
                                "Ban Members",
                                /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                /*#__PURE__*/ jsx_runtime.jsx(components_form/* Switch */.rs, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (styles_module_default()).item,
                            children: [
                                "Kick Members",
                                /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                /*#__PURE__*/ jsx_runtime.jsx(components_form/* Switch */.rs, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (styles_module_default()).item,
                            children: [
                                "Mute Members",
                                /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                /*#__PURE__*/ jsx_runtime.jsx(components_form/* Switch */.rs, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (styles_module_default()).item,
                            children: [
                                "Adv Members",
                                /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                /*#__PURE__*/ jsx_runtime.jsx(components_form/* Switch */.rs, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (styles_module_default()).item,
                            children: [
                                "View History",
                                /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                /*#__PURE__*/ jsx_runtime.jsx(components_form/* Switch */.rs, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: (styles_module_default()).item,
                            children: [
                                "Manage History",
                                /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                                /*#__PURE__*/ jsx_runtime.jsx(components_form/* Switch */.rs, {})
                            ]
                        })
                    ]
                })
            ]
        })
    });
};

// EXTERNAL MODULE: ./components/dashboard/guilds/reasons/styles.module.scss
var reasons_styles_module = __webpack_require__(8654);
var reasons_styles_module_default = /*#__PURE__*/__webpack_require__.n(reasons_styles_module);
// EXTERNAL MODULE: ./components/form/duration/index.tsx
var duration = __webpack_require__(2993);
;// CONCATENATED MODULE: ./components/dashboard/guilds/reasons/index.tsx






const maxDurationLength = 28 * 1000 * 60 * 60 * 24;
const GuildPredefinedReason = ()=>{
    const _id = Utils/* Utils */.c.uuid();
    (0,external_react_.useEffect)(()=>{
        const card = document.querySelector(`div[id="${_id}"]`);
        const span = document.querySelector(`span[id="${_id}"]`);
        const textarea = document.querySelector(`textarea[id="${_id}"]`);
        if (card) {
            const observer = new MutationObserver((mutations)=>{
                if (!mutations.some((mutation)=>mutation.attributeName == "data-opened")) return;
                const isOpened = card.getAttribute("data-opened");
                if (!isOpened) span.innerHTML = textarea.value;
                // @ts-ignore
                span.style = `display: ${isOpened ? "none" : "block"}`;
            });
            observer.observe(card, {
                attributes: true
            });
        }
    }, [
        _id
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Z, {
        retractable: true,
        id: _id,
        style: {
            backgroundColor: "var(--luny-background)",
            marginTop: "0",
            marginBottom: "20px"
        },
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(card/* Card */.Z.Header, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("h2", {
                    style: {
                        fontSize: "18px"
                    },
                    children: [
                        "#1 Rule",
                        /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            id: _id,
                            style: {
                                fontSize: "12px"
                            },
                            children: "Lorem ipsum dolor sit amet consectetur, adipiscing elit praesent vehicula duis integer, bibendum nisi per molestie. Donec vitae parturient pretium pulvinar fermentum ultricies nec elementum eu massa vestibulum, tempus viverra porttitor vulputate taciti torquent gravida vel hac nisi, dictumst vivamus tortor litora maecenas consequat sociis mattis nisl pellentesque. Nec nostra cubilia habitant ut interdum nam feugiat litora potenti vel accumsan ad, vitae euismod dapibus molestie eros non id venenatis integer."
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Z.Content, {
                children: [
                    "Reason Text:",
                    /*#__PURE__*/ jsx_runtime.jsx("textarea", {
                        name: "reason text",
                        id: _id,
                        cols: 30,
                        rows: 10,
                        className: (reasons_styles_module_default()).textInput
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                        children: [
                            "Mute Duration: ",
                            /*#__PURE__*/ jsx_runtime.jsx(duration/* DurationInput */.j, {
                                stages: [
                                    {
                                        name: "days",
                                        label: "d",
                                        max: 28,
                                        min: 0,
                                        ms: 1000 * 60 * 60 * 24
                                    },
                                    {
                                        name: "hours",
                                        label: "h",
                                        max: 24,
                                        min: 0,
                                        ms: 1000 * 60 * 60
                                    },
                                    {
                                        name: "minutes",
                                        label: "m",
                                        max: 60,
                                        min: 0,
                                        ms: 1000 * 60
                                    }
                                ],
                                max: maxDurationLength
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                children: "* Dura\xe7\xe3o maxima de 28 dias"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/dashboard/guilds/index.ts



;// CONCATENATED MODULE: ./components/dashboard/index.ts




/***/ }),

/***/ 7174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ Dots)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


const DotsWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        width: 20px;
        height: 20px;
        background: #8385aa;
        border-radius: 50%;
        margin: 3px;
        animation: loader 0.7s infinite alternate;
    }

    & > div:nth-child(2) {
    animation-delay: 0.2s;
}

    & > div:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes loader {
        to {
            opacity: 0.1;
            background: var(--luny-band-100);
        }
    }
`;
const Dots = ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DotsWrapper, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {})
        ]
    });


/***/ }),

/***/ 2993:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ DurationInput)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1260);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8539);




class DurationInput extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props){
        super(props);
        this.type = "duration";
        this._id = _utils_Utils__WEBPACK_IMPORTED_MODULE_2__/* .Utils */ .c.uuid();
        this.state = {
            values: Object.fromEntries(props.stages.map((stage)=>[
                    stage.name,
                    stage.default || 0
                ])),
            disabled: props.disabled
        };
    }
    calcDuration(values) {
        return Object.entries(values).map(([name, value])=>(this.props.stages.find((stage)=>stage.name === name)?.ms || 0) * value).reduce((a, b)=>a + b, 0);
    }
    #calc(name, value) {
        const newValue = {
            ...this.state.values,
            [name]: Number(event.target.value + `${value}`)
        };
        const v = this.calcDuration(newValue);
        console.log(v, newValue);
        return v;
    }
    get value() {
        return this.calcDuration(this.state.values);
    }
    setDisable(disabled) {
        this.setState({
            disabled
        });
    }
    render() {
        const { props, _id, state: { values, disabled } } = this;
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().container),
            children: props.stages.map((stage, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().innerContainer),
                    style: {
                        display: "inline-block"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().durationInput),
                            type: "number",
                            min: stage.min,
                            max: stage.max,
                            maxLength: 2,
                            placeholder: "0",
                            id: `${_id}-${stage.name}`,
                            defaultValue: stage.default,
                            readOnly: disabled,
                            onChange: (event1)=>this.setState({
                                    values: {
                                        ...values,
                                        [stage.name]: Number(event1.target.value) ?? 0
                                    }
                                }),
                            onKeyPress: (event1)=>([
                                    ",",
                                    ".",
                                    "-",
                                    "e"
                                ].includes(event1.key) || props.max && this.#calc(stage.name, event1.key) > props.max) && event1.preventDefault()
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().label),
                            children: stage.label || stage.name
                        })
                    ]
                }, `${_id}-${i}`))
        });
    }
}


/***/ }),

/***/ 2888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  zx: () => (/* reexport */ Button),
  Ph: () => (/* reexport */ Select),
  rs: () => (/* reexport */ Switch)
});

// UNUSED EXPORTS: DurationInput

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./components/form/select/styles.module.scss
var styles_module = __webpack_require__(6163);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./utils/Utils.ts
var Utils = __webpack_require__(8539);
;// CONCATENATED MODULE: ./components/form/select/index.tsx





class Select extends (external_react_default()).Component {
    constructor(props){
        super(props);
        this.state = {
            opened: false,
            values: props.options.filter((option)=>option.default)
        };
        this.ref = /*#__PURE__*/ external_react_default().createRef();
        this._id = Utils/* Utils */.c.uuid();
    }
    componentDidMount() {
        window.addEventListener("click", (e)=>{
            if (this.ref.current && this.state.opened && !this.ref.current.contains(e.target)) {
                this.setState({
                    opened: false
                });
            }
        }, {
            capture: true
        });
    }
    setValue(value) {
        const { props, state } = this;
        const _values = state.values.map(({ value })=>value);
        const isMultiple = props.maxValues > 1;
        if (isMultiple && state.values.length >= props.maxValues) {
            return false;
        }
        if (_values.includes(value)) {
            this.removeValue(value);
            this.setState({
                opened: false
            });
        } else {
            const option = props.options.find((option)=>option.value == value);
            this.setState({
                values: [
                    option,
                    ...isMultiple ? state.values : []
                ].splice(0, props.maxValues),
                opened: false
            });
        }
    }
    removeValue(value) {
        return this.setState({
            values: this.state.values.filter((option)=>option.value != value)
        });
    }
    render() {
        const { props, state: { values, opened }, _id: id } = this;
        const _values = values.map(({ value })=>value);
        const isMultiple = props.maxValues > 1;
        const style = {
            backgroundColor: props.backgroundColor
        };
        const Placeholder = ()=>{
            let placeholder = props.placeholder;
            if (values.length > 0) {
                if (isMultiple) {
                    placeholder = values.map((option)=>/*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: (styles_module_default()).option,
                            style: style,
                            onClick: ()=>this.removeValue(option.value),
                            children: option.label
                        }, `${option.value}`));
                } else {
                    placeholder = values[0].label;
                }
            }
            return /*#__PURE__*/ jsx_runtime.jsx("div", {
                style: style,
                children: placeholder
            });
        };
        const Options = ()=>{
            const options = isMultiple ? props.options.filter((option)=>!_values.includes(option.value)) : props.options;
            if (options.length > 0) {
                return options.map((option)=>{
                    const props = {
                        "data-value": option.value,
                        style: {}
                    };
                    if (_values.includes(option.value)) {
                        props["data-selected"] = true;
                    }
                    if (option.color) {
                        const c = hexToRgb(option.color);
                        if (c) props.style = {
                            color: `rgb(${c.r}, ${c.g}, ${c.b})`
                        };
                    }
                    return /*#__PURE__*/ (0,external_react_.createElement)("div", {
                        className: (styles_module_default()).option,
                        ...props,
                        key: `${id}${option.value}`,
                        onClick: ()=>this.setValue(option.value),
                        children: [
                            option.icon && /*#__PURE__*/ jsx_runtime.jsx("img", {
                                src: option.icon.url,
                                alt: option.label
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                ...props,
                                children: option.label
                            })
                        ]
                    });
                });
            }
            return /*#__PURE__*/ jsx_runtime.jsx("span", {
                children: "N\xe3o h\xe1 nada para ver aqui"
            });
        };
        const selectProps = {};
        if (opened) selectProps["data-opened"] = true;
        if (values.length >= props.maxValues && isMultiple) selectProps["data-full-values"] = true;
        return /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: (styles_module_default()).select,
            ...selectProps,
            ref: this.ref,
            "data-itemID": id,
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: (styles_module_default()).container,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: (styles_module_default()).placeholderWrapper,
                        onClick: ()=>this.setState({
                                opened: !opened
                            }),
                        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: (styles_module_default()).placeholder,
                            children: /*#__PURE__*/ jsx_runtime.jsx(Placeholder, {})
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: (styles_module_default()).options,
                        style: {
                            backgroundColor: props.backgroundColor
                        },
                        children: Options()
                    })
                ]
            })
        });
    }
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// EXTERNAL MODULE: ./styles/Button.module.scss
var Button_module = __webpack_require__(2913);
var Button_module_default = /*#__PURE__*/__webpack_require__.n(Button_module);
;// CONCATENATED MODULE: ./components/form/button.tsx



function Button(props) {
    return /*#__PURE__*/ jsx_runtime.jsx("button", {
        ...props,
        className: `${(Button_module_default()).button} ${props?.className || ""}`.trim()
    });
}
Button.Content = (props)=>/*#__PURE__*/ jsx_runtime.jsx("span", {
        ...props,
        className: `${(Button_module_default()).text} ${props?.className || ""}`.trim()
    });
Button.Icon = (props)=>/*#__PURE__*/ jsx_runtime.jsx("span", {
        ...props,
        className: `${(Button_module_default()).icon} ${props?.className || ""}`.trim()
    });


// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./components/form/switch.tsx



const SwitchWrapper = (external_styled_components_default()).label`
    display: inline-block;
    height: 40px;
    position: relative;
    width: 56px;

    & > input {
        height: 0px;
        opacity: 0;
        width: 0px;
    }

    & > span  {
        -webkit-transition: .4s;
        background-color: var(--luny-background);
        border-radius: 30px;
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: .4s;
        border: 1px solid var(--luny-ui-15);

        &:before {
            -webkit-transition: .4s;
            background-color: var(--luny-ui-40);
            border-radius: 50%;
            bottom: 4.5px;
            content: "";
            height: 21px;
            left: 4px;
            position: absolute;
            transition: .25s;
            width: 22px;
        }
    }

    & > input:checked + span:before {
        -ms-transform: translateX(24px);
        -webkit-transform: translateX(24px);
        transform: translateX(24px);
        background-color: var(--luny-band-100);
    }

    & > input:checked:disabled + span {
        cursor: no-drop;
        
        &:before {
            background-color: var(--luny-band-40);
        }
    }
`;
const Switch = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(SwitchWrapper, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("input", {
                type: "checkbox",
                ...props
            }),
            /*#__PURE__*/ jsx_runtime.jsx("span", {})
        ]
    });

// EXTERNAL MODULE: ./components/form/duration/index.tsx
var duration = __webpack_require__(2993);
;// CONCATENATED MODULE: ./components/form/index.ts






/***/ }),

/***/ 6273:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   u: () => (/* binding */ APIProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const guildUrlString = /\/dashboard\/guilds\/(\d*)(\/.*)?/i;
const APIContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
class APIProvider extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            user: null,
            guild: null,
            token: null
        };
    }
    componentDidMount() {
        this.setState({
            user: {
                id: "842170079520096276",
                username: "Myka",
                discriminator: "0806",
                avatar: "74a291872af71565d98d870384d8d666",
                public_flags: 0,
                guilds: null
            },
            loading: false,
            token: "N/A"
        });
    }
    async componentDidUpdate() {
        const pathname = window.location.pathname;
        if (guildUrlString.test(pathname)) {
            const guildId = pathname.replace(guildUrlString, "$1");
            if (this.state.guild?.id !== guildId) {
                await this.fetchGuild(guildId);
            }
        } else if (this.state.guild) {
            this.setState({
                guild: null
            });
        }
    }
    checkGuild(guildId) {
        return this.state.guild?.id === guildId;
    }
    async fetchGuild(id) {
        const guild = {
            id,
            name: "\uD83C\uDF07 Lunar City",
            banner: null,
            channels: [
                {
                    id: "002",
                    name: "rules",
                    nsfw: false,
                    parent_id: "001",
                    position: 1,
                    type: 0
                },
                {
                    id: "005",
                    name: "news",
                    nsfw: false,
                    parent_id: "001",
                    position: 1,
                    type: 5
                },
                {
                    id: "004",
                    name: "chat",
                    nsfw: false,
                    parent_id: "003",
                    position: 1,
                    type: 0
                }
            ],
            roles: [
                {
                    id: "787668624797466675",
                    name: "『\uD83D\uDE80 [Dev] Space Engineer』",
                    permissions: 1649267441655,
                    position: 40,
                    color: 10494192,
                    hoist: true,
                    managed: false,
                    mentionable: false
                },
                {
                    id: "787668626403753984",
                    name: "『\uD83D\uDE47‍♀️[Suporte] Atendentes』",
                    permissions: 693741547328,
                    position: 34,
                    color: 13942765,
                    hoist: true,
                    managed: false,
                    mentionable: false
                },
                {
                    id: "787668627943718913",
                    name: "『\uD83C\uDF3F Users』",
                    permissions: 6546640448,
                    position: 23,
                    color: 15109595,
                    hoist: true,
                    managed: false,
                    mentionable: false
                }
            ],
            features: [
                "ANIMATED_ICON"
            ],
            icon: "a_e32c439c0f444ee342ff89e631957af9",
            owner_id: "842170079520096276"
        };
        this.setState({
            guild
        });
        return guild;
    }
    async fetchUserGuilds() {
        this.setState({
            user: {
                ...this.state.user,
                guilds: [
                    {
                        id: "787667696077504552",
                        name: "\uD83C\uDF07 Lunar City",
                        features: [
                            "ANIMATED_ICON"
                        ],
                        icon: "a_e32c439c0f444ee342ff89e631957af9",
                        owner: true,
                        permissions: 8
                    }
                ]
            }
        });
    }
    render() {
        const { props: { children }, state: { loading, user, guild }, fetchUserGuilds, fetchGuild, checkGuild } = this;
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(APIContext.Provider, {
            value: {
                signed: !!user,
                loading,
                user,
                guild,
                checkGuild: checkGuild.bind(this),
                fetchUserGuilds: fetchUserGuilds.bind(this),
                fetchGuild: fetchGuild.bind(this)
            },
            children: children
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (APIContext);


/***/ }),

/***/ 3660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useAPI)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_TestAPIContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6273);


const useAPI = ()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TestAPIContext__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);


/***/ }),

/***/ 4178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyApp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3716);
/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_dashboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7169);
/* harmony import */ var _utils_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9248);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _contexts_TestAPIContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6273);








function MyApp({ Component, pageProps }) {
    const [_mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const body = document.querySelector("body");
        if (!_mode) {
            setMode(localStorage.getItem("theme") || "dark");
        }
        const mode = localStorage.getItem("theme") || "dark";
        body.setAttribute("data-theme", mode);
        window.changeMode = (mode)=>{
            localStorage.setItem("theme", mode);
            document.querySelector("[data-styled]").innerHTML = `:root {${(0,_utils_theme__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP)({
                mode: mode || "dark"
            }).toString()}}`;
            body.setAttribute("data-theme", mode);
        };
    });
    const Children = router.pathname.startsWith("/dashboard") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_dashboard__WEBPACK_IMPORTED_MODULE_4__/* .DashboardLayout */ .cl, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...pageProps
        })
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
        ...pageProps
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Luna"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        href: "https://pro.fontawesome.com/releases/v5.15.4/css/all.css",
                        rel: "stylesheet"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        href: "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap",
                        rel: "stylesheet"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        href: "https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css",
                        rel: "stylesheet"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
                        rel: "stylesheet"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
                id: "colors",
                children: `
                :root {${(0,_utils_theme__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP)({
                    mode: _mode || "dark"
                })}};
            `
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "backgroundGradient"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_contexts_TestAPIContext__WEBPACK_IMPORTED_MODULE_7__/* .APIProvider */ .u, {
                children: Children
            })
        ]
    });
}


/***/ }),

/***/ 1360:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyDocument)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);



class MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {
    static async getInitialProps(ctx) {
        const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_2__.ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = ()=>originalRenderPage({
                    enhanceApp: (App)=>(props)=>sheet.collectStyles(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(App, {
                                ...props
                            }))
                });
            const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);
            return {
                ...initialProps,
                styles: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        initialProps.styles,
                        sheet.getStyleElement()
                    ]
                })
            };
        } finally{
            sheet.seal();
        }
    }
}


/***/ }),

/***/ 8539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ Utils)
/* harmony export */ });
class Utils {
    static uuid() {
        let d = Date.now();
        let d2 = typeof performance !== "undefined" && performance.now && performance.now() * 1000 || 0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
        });
    }
    static stringAcronym(string) {
        return string.replace(/'s /g, " ").replace(/\w+/g, (w)=>w[0]).replace(/\s/g, "");
    }
    static getUserAvatar(user, options = {
        size: 1024
    }) {
        if (user?.avatar) {
            return `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=${options.size}`;
        } else {
            return `https://cdn.discordapp.com/embed/avatars/${Number(user?.discriminator || "0000") % 5}.png`;
        }
    }
    static getGuildIcon(guild, options = {
        size: 1024
    }) {
        if (guild.icon) {
            return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${options.dynamic && guild.icon.startsWith("a_") && guild.features.includes("ANIMATED_ICON") ? "gif" : "png"}?size=${options.size}`;
        } else {
            return undefined;
        }
    }
    static generateOAuth2Discord({ clientId = process.env.DISCORD_CLIENT_ID, scopes, permissions = BigInt(0), guildId = null, redirectUri = "/", responseType = "code", state = null, disableGuildSelect = false, prompt = null }) {
        const query = new URLSearchParams({
            client_id: clientId,
            scope: scopes.join(" ")
        });
        if (permissions) {
            query.set("permissions", Number(permissions).toString());
        }
        if (guildId) {
            query.set("guild_id", guildId);
            if (disableGuildSelect) {
                query.set("disable_guild_select", "true");
            }
        }
        if (redirectUri) {
            query.set("redirect_uri", redirectUri);
            query.set("response_type", responseType);
            if (state) {
                query.set("state", state);
            }
            if (prompt) {
                query.set("prompt", prompt);
            }
        }
        return `https://discord.com/api/oauth2/authorize?${query.toString()}`;
    }
}


/***/ }),

/***/ 9248:
/***/ ((module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "ZP", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const blackColor = "#000000";
const whiteColor = "#ffffff";
const basesColors = {
    dark: {
        background: "#141520",
        backgroundSecondary: "#20212B",
        ui: whiteColor,
        flow: blackColor,
        text: whiteColor,
        overlay: blackColor,
        icon: whiteColor,
        gradient: "rgba(160, 32, 240, 0.03)"
    },
    light: {
        background: "#CCE",
        backgroundSecondary: "#DDF",
        ui: blackColor,
        flow: whiteColor,
        text: blackColor,
        overlay: whiteColor,
        icon: null,
        gradient: "rgba(160, 32, 240, 0.13)"
    }
};
const tonalits = Object.entries({
    "5": "0d",
    "10": "1a",
    "15": "26",
    "20": "33",
    "40": "66",
    "60": "99",
    "80": "cc",
    "100": ""
});
function ThemeCSSVariables({ band = "#A020F0", mode = "dark" } = {}) {
    const baseColors = basesColors[mode] || basesColors["dark"];
    const obj = {
        "--luny-background": baseColors.background,
        "--luny-backgroundSecondary": baseColors.backgroundSecondary,
        "--luny-band": band,
        "--luny-text": baseColors.text,
        "--luny-ui": baseColors.ui,
        "--luny-flow": baseColors.flow,
        ...mapTonalits("--luny-band", band),
        ...mapTonalits("--luny-ui", baseColors.ui),
        ...mapTonalits("--luny-flow", baseColors.flow),
        ...mapTonalits("--luny-text", baseColors.text),
        "--luny-overlay": baseColors.overlay + "E6",
        "--luny-icon": baseColors.icon || band,
        "--luny-green": "#61fe80",
        "--luny-red": "#fe4854",
        "--luny-blue": "#0d97fb",
        "--luny-gradient": `${baseColors.gradient}`
    };
    return {
        ...obj,
        toString: ()=>{
            return Object.entries({
                ...obj
            }).map(([key, value])=>`${key}:${value};`).join("");
        }
    };
}
function mapTonalits(key, color) {
    return Object.fromEntries(tonalits.map(([tonalit, value])=>[
            `${key}-${tonalit}`,
            `${color}${value}`
        ]));
}
const _default = ThemeCSSVariables;
__webpack_unused_export__ = mapTonalits;


/***/ }),

/***/ 3716:
/***/ (() => {



/***/ })

};
;