import React, {Component} from 'react';
import { Button } from 'react-materialize';

class ScrollButton extends Component {
  constructor() {
      super();
      this.state = {
          intervalId: 0,
          hide: false,
          height: window.innerHeight
      };
  }

  updateDimensions() {
    const reelContainerWidth = window.innerWidth - 400;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(
            this.scrollStep.bind(this),
            this.props.delayInMs
        );
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
        <Button
            floating
            small
            className='absolute mr-4 pin-r blue'
            onClick={() => { this.scrollToTop(); }}
        >
            <i class="material-icons">
            keyboard_arrow_up
                </i>
        </Button>
        )
    }
}

export default ScrollButton;
