"use strict";

import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { latLngBounds } from "leaflet";
import React from "react";
import { LeafletProvider } from "./context";
import MapEvented from "./MapEvented";
import updateClassName from "./utils/updateClassName";
import omit from "./utils/omit";
import { UniversalStyle as Style } from "react-css-component";
import STYLES from "./Map.styles";
var OTHER_PROPS = ["children", "className", "id", "style", "useFlyTo", "whenReady"];

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? [pos[0], pos[1]] : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map =
/*#__PURE__*/
function (_MapEvented) {
  _inheritsLoose(Map, _MapEvented);

  function Map(props) {
    var _this;

    _this = _MapEvented.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "className", void 0);

    _defineProperty(_assertThisInitialized(_this), "contextValue", void 0);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "viewport", {
      center: undefined,
      zoom: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "windyStore", null);

    _defineProperty(_assertThisInitialized(_this), "windyPicker", null);

    _defineProperty(_assertThisInitialized(_this), "windyBroadcast", null);

    _defineProperty(_assertThisInitialized(_this), "_windyMapReady", false);

    _defineProperty(_assertThisInitialized(_this), "_ready", false);

    _defineProperty(_assertThisInitialized(_this), "_updating", false);

    _defineProperty(_assertThisInitialized(_this), "_windyParticleLayer", null);

    _defineProperty(_assertThisInitialized(_this), "onViewportChange", function () {
      var center = _this.leafletElement.getCenter();

      _this.viewport = {
        center: center ? [center.lat, center.lng] : undefined,
        zoom: _this.leafletElement.getZoom()
      };

      if (_this.props.onViewportChange && !_this._updating) {
        _this.props.onViewportChange(_this.viewport);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onViewportChanged", function () {
      if (_this.props.onViewportChanged && !_this._updating) {
        _this.props.onViewportChanged(_this.viewport);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "bindContainer", function (container) {
      _this.container = container;
    });

    _this.className = props.className;
    return _this;
  }

  var _proto = Map.prototype;

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    this._updating = true;
    var animate = toProps.animate,
        bounds = toProps.bounds,
        boundsOptions = toProps.boundsOptions,
        boxZoom = toProps.boxZoom,
        center = toProps.center,
        className = toProps.className,
        doubleClickZoom = toProps.doubleClickZoom,
        dragging = toProps.dragging,
        keyboard = toProps.keyboard,
        maxBounds = toProps.maxBounds,
        scrollWheelZoom = toProps.scrollWheelZoom,
        tap = toProps.tap,
        touchZoom = toProps.touchZoom,
        useFlyTo = toProps.useFlyTo,
        viewport = toProps.viewport,
        zoom = toProps.zoom,
        overlay = toProps.overlay,
        level = toProps.level,
        timestamp = toProps.timestamp,
        favOverlays = toProps.favOverlays,
        product = toProps.product,
        graticule = toProps.graticule,
        particlesAnim = toProps.particlesAnim,
        pickerPosition = toProps.pickerPosition;
    updateClassName(this.container, fromProps.className, className);

    if (viewport && viewport !== fromProps.viewport) {
      var c = viewport.center ? viewport.center : center;
      var z = viewport.zoom == null ? zoom : viewport.zoom;

      if (useFlyTo === true) {
        this.leafletElement.flyTo(c, z, {
          animate: animate
        });
      } else {
        this.leafletElement.setView(c, z, {
          animate: animate
        });
      }
    } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
      if (useFlyTo === true) {
        this.leafletElement.flyTo(center, zoom, {
          animate: animate
        });
      } else {
        this.leafletElement.setView(center, zoom, {
          animate: animate
        });
      }
    } else if (typeof zoom === "number" && zoom !== fromProps.zoom) {
      if (fromProps.zoom == null) {
        this.leafletElement.setView(center, zoom);
      } else {
        this.leafletElement.setZoom(zoom);
      }
    }

    if (maxBounds && this.shouldUpdateBounds(maxBounds, fromProps.maxBounds)) {
      this.leafletElement.setMaxBounds(maxBounds);
    }

    if (bounds && (this.shouldUpdateBounds(bounds, fromProps.bounds) || boundsOptions !== fromProps.boundsOptions)) {
      if (useFlyTo === true) {
        this.leafletElement.flyToBounds(bounds, boundsOptions);
      } else {
        this.leafletElement.fitBounds(bounds, boundsOptions);
      }
    }

    if (boxZoom !== fromProps.boxZoom) {
      if (boxZoom === true) {
        this.leafletElement.boxZoom.enable();
      } else {
        this.leafletElement.boxZoom.disable();
      }
    }

    if (doubleClickZoom !== fromProps.doubleClickZoom) {
      if (doubleClickZoom === true) {
        this.leafletElement.doubleClickZoom.enable();
      } else {
        this.leafletElement.doubleClickZoom.disable();
      }
    }

    if (dragging !== fromProps.dragging) {
      if (dragging === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }

    if (keyboard !== fromProps.keyboard) {
      if (keyboard === true) {
        this.leafletElement.keyboard.enable();
      } else {
        this.leafletElement.keyboard.disable();
      }
    }

    if (scrollWheelZoom !== fromProps.scrollWheelZoom) {
      if (scrollWheelZoom === true || typeof scrollWheelZoom === "string") {
        this.leafletElement.options.scrollWheelZoom = scrollWheelZoom;
        this.leafletElement.scrollWheelZoom.enable();
      } else {
        this.leafletElement.scrollWheelZoom.disable();
      }
    }

    if (tap !== fromProps.tap) {
      if (tap === true) {
        this.leafletElement.tap.enable();
      } else {
        this.leafletElement.tap.disable();
      }
    }

    if (touchZoom !== fromProps.touchZoom) {
      if (touchZoom === true || typeof touchZoom === "string") {
        this.leafletElement.options.touchZoom = touchZoom;
        this.leafletElement.touchZoom.enable();
      } else {
        this.leafletElement.touchZoom.disable();
      }
    }

    if (overlay !== fromProps.overlay) {
      if (overlay === "none") {
        this.windyStore.set("overlay", "wind");
      } else {
        this.windyStore.set("overlay", overlay);
      }
    }

    if (level !== fromProps.level) {
      this.windyStore.set("level", level);
    }

    if (timestamp !== fromProps.timestamp) {
      this.windyStore.set("timestamp", timestamp);
    }

    if (favOverlays !== fromProps.favOverlays) {
      this.windyStore.set("favOverlays", favOverlays);
    }

    if (product !== fromProps.product) {
      this.windyStore.set("overlay", product);
    }

    if (graticule !== fromProps.graticule) {
      this.windyStore.set("graticule", graticule);
    }

    if (particlesAnim !== fromProps.particlesAnim) {
      this.windyStore.set("particlesAnim", particlesAnim);
    }

    if (fromProps.pickerPosition && !pickerPosition) {
      this.windyPicker.close();
    }

    if (!fromProps.pickerPosition && pickerPosition || fromProps.pickerPosition && pickerPosition && (fromProps.pickerPosition[0] !== pickerPosition[0] || fromProps.pickerPosition[1] !== pickerPosition[1])) {
      this.windyPicker.open({
        lat: pickerPosition[0],
        lon: pickerPosition[1]
      });
    }

    this._updating = false;
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var props = omit.apply(void 0, [this.props].concat(OTHER_PROPS));
    props.key = props.windyKey;

    if (props.overlay === "none") {
      props.overlay = "wind";
    }

    var viewport = props.viewport,
        options = _objectWithoutPropertiesLoose(props, ["viewport"]);

    if (viewport) {
      if (viewport.center) {
        options.center = viewport.center;
      }

      if (typeof viewport.zoom === "number") {
        options.zoom = viewport.zoom;
      }
    }

    var script = document.createElement("script");
    script.src = "https://api.windy.com/assets/map-forecast/libBoot.js";
    script.async = true;

    script.onload = function () {
      windyInit(options, function (windyAPI) {
        var map = windyAPI.map,
            store = windyAPI.store,
            picker = windyAPI.picker,
            broadcast = windyAPI.broadcast;
        _this2.windyStore = store;
        _this2.windyPicker = picker;
        _this2.windyBroadcast = broadcast;
        _this2.leafletElement = map;
        _this2.leafletElement.options.maxZoom = props.maxZoom || 18;
        _this2.leafletElement.options.minZoom = props.minZoom || 2;

        _this2.leafletElement.on("move", _this2.onViewportChange);

        _this2.leafletElement.on("moveend", _this2.onViewportChanged);

        if (props.onPickerOpened) {
          picker.on("pickerOpened", function (latLon) {
            return props.onPickerOpened(latLon);
          });
        }

        if (props.onPickerMoved) {
          picker.on("pickerMoved", function (latLon) {
            return props.onPickerMoved(latLon);
          });
        }

        if (props.onPickerClosed) {
          picker.on("pickerClosed", function () {
            return props.onPickerClosed();
          });
        }

        if (props.center && props.zoom) {
          if (Array.isArray(props.center)) {
            _this2.leafletElement.setView(new L.LatLng(props.center[0], props.center[1]), props.zoom);
          } else {
            _this2.leafletElement.setView(new L.LatLng(props.center.lat, props.center.lng), props.zoom);
          }
        }

        if (props.bounds != null) {
          _this2.leafletElement.fitBounds(props.bounds, props.boundsOptions);
        }

        broadcast.once("redrawFinished", function () {
          if (props.removeWindyLayers) {
            _this2.leafletElement.eachLayer(function (layer) {
              if (layer._url && layer._url.includes("windy")) {
                _this2.leafletElement.removeLayer(layer);

                return;
              }

              if (layer.tilesUrl && layer.tilesUrl.includes("windy")) {
                _this2.leafletElement.removeLayer(layer);

                return;
              }
            });
          }

          if (props.pickerPosition) {
            picker.open({
              lat: props.pickerPosition[0],
              lon: props.pickerPosition[1]
            });
          }

          _this2.contextValue = {
            layerContainer: _this2.leafletElement,
            map: _this2.leafletElement
          };
          _this2._windyMapReady = true;

          if (_this2.props.onWindyMapReady) {
            _this2.props.onWindyMapReady(_this2);
          }

          _MapEvented.prototype.componentDidMount.call(_this2);

          _this2.forceUpdate(); // Re-render now that leafletElement is created

        });
      });
    };

    document.body.appendChild(script);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this._ready === false) {
      this._ready = true;

      if (this.props.whenReady) {
        this.leafletElement.whenReady(this.props.whenReady);
      }
    }

    if (this.leafletElement) {
      _MapEvented.prototype.componentDidUpdate.call(this, prevProps);

      this.updateLeafletElement(prevProps, this.props);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _MapEvented.prototype.componentWillUnmount.call(this);

    if (this.leafletElement) {
      this.leafletElement.off("move", this.onViewportChange);
      this.leafletElement.off("moveend", this.onViewportChanged); // The canvas renderer uses requestAnimationFrame, making a deferred call to a deleted object
      // When preferCanvas is set, use simpler teardown logic

      if (this.props.preferCanvas === true) {
        this.leafletElement._initEvents(true);

        this.leafletElement._stop();
      } else {
        this.leafletElement.remove();
      }
    }
  };

  _proto.shouldUpdateCenter = function shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  };

  _proto.shouldUpdateBounds = function shouldUpdateBounds(next, prev) {
    return prev ? !latLngBounds(next).equals(latLngBounds(prev)) : true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        windyLabels = _this$props.windyLabels,
        windyControls = _this$props.windyControls,
        overlay = _this$props.overlay,
        overlayOpacity = _this$props.overlayOpacity;
    return React.createElement(React.Fragment, null, React.createElement(Style, {
      css: STYLES.BASE
    }), overlay !== "none" && React.createElement(Style, {
      css: STYLES.WINDY_OVERLAY
    }), overlayOpacity && React.createElement(Style, {
      css: STYLES.WINDY_OVERLAY_OPACITY(overlayOpacity)
    }), !windyLabels && React.createElement(Style, {
      css: STYLES.NO_WINDY_LABELS
    }), !windyControls && React.createElement(Style, {
      css: STYLES.NO_WINDY_CONTROLS
    }), React.createElement("div", {
      className: this.className,
      id: "windy",
      ref: this.bindContainer,
      style: this.props.style
    }, this.contextValue ? React.createElement(LeafletProvider, {
      value: this.contextValue
    }, this._windyMapReady && this.props.mapElements) : null));
  };

  return Map;
}(MapEvented);

export { Map as default };
