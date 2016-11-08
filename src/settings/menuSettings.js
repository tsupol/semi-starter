import React from 'react';
import {
    ActionDateRange,
    ActionHome,
    ActionEvent,
    ActionEventSeat,
    ActionPermContactCalendar,
    SocialPerson,
    ActionSettings,
    ActionDashboard,
    ActionAccessibility,
    ActionStars,
    ActionStore
} from 'material-ui/svg-icons';

export default {
    mainMenu: [
        {
            text: "Home",
            icon: <ActionHome />,
            to: "/"
        },
        {
            text: "Hair",
            icon: <ActionHome />,
            to: "/hair"
        },
        {
            text: "Forehead",
            icon: <ActionHome />,
            to: "/forehead"
        },
        {
            text: "Nose",
            icon: <ActionHome />,
            to: "/nose"
        },
        {
            text: "Nose (Recon)",
            icon: <ActionHome />,
            to: "/nose-recon"
        },
        {
            text: "Eyelids",
            icon: <ActionHome />,
            to: "/eyelids"
        },
        {
            text: "Around Eyes",
            icon: <ActionHome />,
            to: "/around-eyes"
        },
        {
            text: "Eyebrow",
            icon: <ActionHome />,
            to: "/eyebrow"
        },
        {
            text: "Lips",
            icon: <ActionHome />,
            to: "/lips"
        },
        {
            text: "Breast",
            icon: <ActionHome />,
            to: "/breast"
        },
        {
            text: "Chin",
            icon: <ActionHome />,
            to: "/chin"
        },
        {
            text: "Cheek Bulge",
            icon: <ActionHome />,
            to: "/cheek-bulge"
        },
        {
            text: "Liposuction",
            icon: <ActionHome />,
            to: "/liposuction"
        },
        {
            text: "Implants",
            icon: <ActionHome />,
            to: "/implants"
        },
        {
            text: "Examples",
            icon: <ActionStars />,
            to: "/examples",
            nestedItems : [
                {
                    text: "Grid",
                    to: "/grid"
                },
                {
                    text: "Form",
                    to: "/form"
                },
                {
                    text: "DataTable",
                    to: "/datatable"
                }
            ]
        }
    ]
};