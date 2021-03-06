'use strict';

import React, { Component, PropTypes } from 'react';

import Project from './Project';
import Menu from './Menu';

import { multiply, switcherHover } from '../vanila.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: window.location.search,
      projectID: 0,
      menuPopupOpened: false,
      menuType: 'shopItems'
    };
  }

  componentDidMount() {
    switcherHover();

    window.addEventListener('popstate', function() {
      const availableUrls = this.props.projects.map(project => project.url);
      const currentUrl = window.location.search.substring(1);

      this.setProject(availableUrls, currentUrl);
    }.bind(this));
  }

  componentWillMount() {
    const availableUrls = this.props.projects.map(project => project.url);
    const currentUrl = window.location.search.substring(1);

    if (availableUrls.indexOf(currentUrl) > -1) {
      this.setProject(availableUrls, currentUrl)
    } else {
      window.location.href = '/';
    }
  }

  setProject(arr, url) {
    arr.map((item, index) => {
      if (item === url) {
        this.setState({
          currentPath: url,
          projectID: index
        });
      }
    });
  }

  projectSwitcher(direction) {
    let projectID = this.state.projectID;
    let data = this.props.projects;
    let maxID = data.length - 1;

    if (direction === 'next') {
      if (projectID === maxID) {
        projectID = 2
      } else if (projectID === 0) {
        projectID = projectID + 2
      } else {
        projectID += 1
      }

      this.setState({
        currentPath: data[projectID].url,
        projectID: projectID,
        menuPopupOpened: false
      });

      window.history.pushState(projectID, 'C_C', '?' + data[projectID].url);
    } else if (direction === 'home') {
      projectID = 0

      this.setState({
        currentPath: data[projectID].url,
        projectID: projectID,
        menuPopupOpened: false
      });

      window.history.pushState(projectID, 'C_C', '?' + data[projectID].url);
    } else if (direction === 'crew') {
      projectID = 1

      this.setState({
        currentPath: data[projectID].url,
        projectID: projectID,
        menuPopupOpened: false
      });

      window.history.pushState(projectID, 'C_C', '?' + data[projectID].url);
    } else {
      if (projectID === 0) {
        projectID = maxID
      } else if (projectID === 2) {
        projectID = maxID
      } else {
        projectID -= 1
      }

      this.setState({
        currentPath: data[projectID].url,
        projectID: projectID,
        menuPopupOpened: false
      });

      window.history.pushState(projectID, 'C_C', '?' + data[projectID].url);
    }
  }

  toggleMenuPopup(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      menuPopupOpened: true,
      menuType: 'shopItems'
    })
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <img src="./public/icons/c_c-logo.svg" alt="" onClick={::this.projectSwitcher.bind(this, 'home')}/>
        </div>
        <div className="btn-popup">Next project</div>
        <div className="content">
          <div className="navbar">
            <img src="./public/icons/menu-top-bar.svg" alt="" />
            <a target="_blank" href="https://www.facebook.com/computercraphics/">
              <span className="square-social" id="facebook-social">
                <img src="./public/icons/facebook-icon.svg" alt="" />
              </span>
            </a>
            <a target="_blank" href="https://www.instagram.com/computer_craphics">
              <span className="square-social" id="instagram-social">
                <img src="./public/icons/instagram-icon.svg" alt="" />
              </span>
            </a>
            <a target="_blank" href="https://ru.pinterest.com/comutercraphics/">
              <span className="square-social" id="pinterest-social">
                <img src="./public/icons/pinterest-icon.svg" alt="" />
              </span>
            </a>
            <a href="" onClick={::this.toggleMenuPopup}>
              <span className="square-social" id="ello-social">
                <img src="./public/icons/store-icon.svg" alt="" style={{width: '100px'}} />
              </span>
            </a>
            <a href="#">
              <span className="square-social" onClick={::this.projectSwitcher.bind(this, 'crew')} id="crew-social">
                <img src="./public/icons/about-icon.svg" alt="" style={{width: '85px'}} />
              </span>
            </a>
            <div className="project-switcher">
              <div className="prev-btn" onClick={::this.projectSwitcher.bind(this, 'prev')}><img src="./public/icons/arrow-left.svg" alt="" /></div>
              <div className="next-btn" onClick={::this.projectSwitcher.bind(this, 'next')}><img src="./public/icons/arrow-right.svg" alt="" /></div>
            </div>
            <span className="project-inscription">
              Projects
            </span>
          </div>
          <Project stickers={this.props.stickers} project={this.props.projects[this.state.projectID]} projectSwitcher={::this.projectSwitcher.bind(this)} />
        </div>
        <div className="navbar mobile">
          <img src="./public/icons/menu-top-bar-mobile.png" alt="" />
          <a target="_blank" href="https://www.facebook.com/computercraphics/">
            <span className="square-social">
              <img src="./public/icons/facebook-icon.svg" alt="" />
            </span>
          </a>
          <a target="_blank" href="https://www.instagram.com/computer_craphics">
            <span className="square-social">
              <img src="./public/icons/instagram-icon.svg" alt="" />
            </span>
          </a>
          <a target="_blank" href="https://ru.pinterest.com/comutercraphics/">
            <span className="square-social">
              <img src="./public/icons/pinterest-icon.svg" alt="" />
            </span>
          </a>
          <a href="" onClick={::this.toggleMenuPopup}>
            <span className="square-social">
              <img src="./public/icons/store-icon.svg" alt="" style={{width: '100px'}}/>
            </span>
          </a>
          <a href="">
            <span className="square-social" onClick={::this.projectSwitcher.bind(this, 'crew')}>
              <img src="./public/icons/about-icon.svg" alt="" style={{width: '70px'}}/>
            </span>
          </a>
          <div className="project-switcher">
            <div className="prev-btn" onClick={::this.projectSwitcher.bind(this, 'prev')}><img src="./public/icons/arrow-top.svg" alt="" /></div>
            <div className="next-btn" onClick={::this.projectSwitcher.bind(this, 'next')}><img src="./public/icons/arrow-bottom.svg" alt="" /></div>
          </div>
        </div>
        <Menu projectsData={this.props.projects} shopItemsData={this.props.shopItems} lastUpd={this.props.lastUpd} miniActionsLinks={this.props.miniActionsLinks} menuType={this.props.menuType} menuOpened={this.state.menuPopupOpened} randomPicLink={this.props.randomPicLink}></Menu>
      </div>
    );
  }
}

export default Main;
