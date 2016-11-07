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