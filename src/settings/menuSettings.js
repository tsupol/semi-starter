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
            text: "Demo",
            icon: <ActionStars />,
            to: "/demo"
        }
    ]
};