/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Anontools,
  Logo,
  Navigation,
  SearchWidget,
  Breadcrumbs,
} from '@plone/volto/components';
import HeaderImage from '~/components/Header/HeaderImage';
import HomepageSlider from '~/components/Header/HomepageSlider';

import { getFrontpageSlides, getDefaultHeaderImage } from '~/actions';

import HeaderBackground from './header-bg.png';

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomepage: this.props.actualPathName == '/',
      url: null,
      description: null,
      title: null,
      inCountryFolder: false,
      defaultHeaderImage: null,
      frontPageSlides: null,
    };
  }
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    actualPathName: PropTypes.string.isRequired,
    folderHeader: PropTypes.object,
    defaultHeaderImage: PropTypes.array,
    frontPageSlides: PropTypes.array,
    getFrontpageSlides: PropTypes.func.isRequired,
    getDefaultHeaderImage: PropTypes.func.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: nextProps.actualPathName == '/',
      });
    }
    if (
      JSON.stringify(nextProps.folderHeader) !==
      JSON.stringify(this.props.folderHeader)
    ) {
      this.setState({
        url: nextProps.folderHeader.url,
        description: nextProps.folderHeader.description,
        title: nextProps.folderHeader.title,
        inCountryFolder: nextProps.folderHeader.inCountryFolder,
      });
    }
    if (
      JSON.stringify(nextProps.defaultHeaderImage) !==
      JSON.stringify(this.props.defaultHeaderImage)
    ) {
      this.setState({
        defaultHeaderImage: nextProps.defaultHeaderImage[0],
      });
    }

    if (
      JSON.stringify(nextProps.frontPageSlides) !==
      JSON.stringify(this.props.frontPageSlides)
    ) {
      this.setState({
        frontPageSlides: nextProps.frontPageSlides,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: this.props.actualPathName == '/',
      });
    }
  }

  componentWillMount() {
    this.props.getFrontpageSlides();
    this.props.getDefaultHeaderImage();
  }
  // componentWillUnmount() {
  //   this.setState({
  //     isHomepage: false
  //   })
  // }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment basic className="header-wrapper" role="banner">
        <Container>
          <div className="header-bg">
            <img src={HeaderBackground} alt="" />
          </div>
          <div className="header">
            <div className="logo-nav-wrapper space-between">
              <div className="logo">
                <Logo />
              </div>
              <Navigation pathname={this.props.pathname} />
            </div>
            <div className="nav-actions">
              <div className="search">
                <SearchWidget pathname={this.props.pathname} />
              </div>
              {!this.props.token && (
                <div className="tools">
                  <Anontools />
                </div>
              )}
            </div>
          </div>
          {this.state.isHomepage ? (
            <HomepageSlider items={this.state.frontPageSlides} />
          ) : (
            // <div>test</div>
            <div>
              <Breadcrumbs pathname={this.props.pathname} />

              <HeaderImage
                url={
                  this.state.inCountryFolder
                    ? this.state.url
                    : this.state.defaultHeaderImage &&
                      this.state.defaultHeaderImage.image
                }
              >
                {this.state.inCountryFolder ? (
                  <div className="header-image">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>
                  </div>
                ) : (
                  ''
                )}
              </HeaderImage>
            </div>
          )}
        </Container>
      </Segment>
    );
  }
}

// export default connect((state) => ({
//   token: state.userSession.token,
// }))(Header);

export default compose(
  connect(
    state => ({
      frontPageSlides: state.frontpage_slides.items,
      token: state.userSession.token,
      defaultHeaderImage: state.default_header_image.items,
    }),
    { getFrontpageSlides, getDefaultHeaderImage },
  ),
)(Header);
