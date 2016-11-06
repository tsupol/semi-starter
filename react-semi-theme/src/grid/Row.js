import React, {PropTypes, Component} from 'react';
import Col from './Col';
import helper from './../libs/helper';

const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};

const sizeList = ['xl', 'lg', 'md', 'sm', 'xs'];
const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

class Row extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // Responsive
            currentSize: false
        };
        // For debouncing on window resized
        this.timeout = false;
        this.delay = 250;
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.processResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    /**
     * Private: update children when size changed
     */
    processResize = () => {
        let currentSize = 'xs';
        let docWidth = document.body.clientWidth;
        if (docWidth > breakpoints.xl) currentSize = 'xl';
        else if (docWidth > breakpoints.lg) currentSize = 'lg';
        else if (docWidth > breakpoints.md) currentSize = 'md';
        else if (docWidth > breakpoints.sm) currentSize = 'sm';
        else if (docWidth > breakpoints.xs) currentSize = 'xs';

        if(this.state.currentSize !== currentSize) {
            this.setState({currentSize})
        }
    };

    /**
     * Private: debouncing function
     */
    onWindowResize = () => {
        // clear the timeout
        clearTimeout(this.timeout);
        // start timing for event "completion"
        this.timeout = setTimeout(()=> {
            this.processResize();
        }, this.delay);
    };

    render() {
        let currentSize = this.state.currentSize;
        if(!currentSize) return <div className="sg-row">{this.props.children}</div>;

        const children = React.Children.map(this.props.children, elem => {
            let props = elem.props;
            if(elem.type == Col) {
                // Auto
                let calculatedWidth = -1,
                    marginLeft = 0,
                    textAlign = 'inherit';

                // Find appropriate grid size (e.g. if no `md` will use `xs`)
                let sizeIdx = -1;
                for(let i = 0; i < sizeList.length; i++) {
                    if(sizeList[i] == currentSize) {
                        sizeIdx = i;
                        break;
                    }
                }
                if(sizeIdx >= 0) {
                    // console.log('sizeIdx', sizeIdx);
                    // Width
                    for(let i = sizeIdx; i < sizeList.length; i++) {
                        let width = helper.get(props, sizeList[i]);
                        if (width) {
                            calculatedWidth = width === true ? '100%' : width;
                            break;
                        }
                    }
                    // If nothing specified use auto width
                    if(calculatedWidth === -1) {
                        calculatedWidth = Math.floor(100 / (this.props.children.length)) + '%';
                    }
                    // Offset
                    for(let i = sizeIdx; i < sizeList.length; i++) {
                        let offset = helper.get(props, sizeList[i] + 'Offset');
                        if (offset) {
                            marginLeft = offset;
                            break;
                        }
                    }
                    // Align
                    for(let i = sizeIdx; i < sizeList.length; i++) {
                        let align = helper.get(props, sizeList[i] + 'Align');
                        if (align) {
                            textAlign = align;
                            break;
                        }
                    }
                }
                return React.cloneElement(elem, {style: {width: calculatedWidth, marginLeft, textAlign}});
            } else {
                return elem;
            }
        });
        return <div className="sg-row">{children}</div>;
    }
}

Row.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

export default Row;