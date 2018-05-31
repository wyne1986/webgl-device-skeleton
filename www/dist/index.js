(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = window.document.querySelector("app");
var renderer = new window.THREE.WebGLRenderer({ antialias: true });
var scene = function () {
    var scene = new window.THREE.Scene();
    scene.fog = new window.THREE.Fog(0xffffff, 0.025, 1000);
    return scene;
}();
var camera = function () {
    var camera = new window.THREE.PerspectiveCamera(75, app.offsetWidth / app.offsetHeight, 0.1, 500);
    camera.position.y = 20;
    camera.position.z = 45;
    return camera;
}();
var frame = { ms: 1000 / 50 };
var animate = function () {
    var now = window.Date.now();
    var from = window.Date.now();
    var diff = void 0;
    return function () {
        window.requestAnimationFrame(animate);
        now = window.Date.now();
        diff = now - from;
        if (diff > frame.ms) {
            from = now - diff % frame.ms;
            renderer.render(scene, camera);
        }
    };
}();
renderer.setSize(app.offsetWidth, app.offsetHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
app.append(renderer.domElement);
scene.add(function () {
    var mesh = new window.THREE.Mesh(new window.THREE.CircleGeometry(100, 64), new window.THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.BackSide }));
    mesh.rotation.x = window.Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}());
scene.add(function () {
    var mesh = new window.THREE.Mesh(new window.THREE.SphereGeometry(100, 64, 64), new window.THREE.MeshLambertMaterial({ color: 0x000000, side: THREE.BackSide }));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}());
scene.add(new window.THREE.AmbientLight(0xffffff, 0.5));
animate();
new window.THREE.OrbitControls(camera, renderer.domElement);

},{}]},{},[1]);
