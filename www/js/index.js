/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        var whereBtn = document.getElementById("whereami");
        whereBtn.addEventListener('click', this.whereami, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    whereami: function() {
        console.log('whereami');
        var success = function(position) {
            console.log(JSON.stringify(position));
            app.whatcity(position);
        };
        var failure = function() {
            console.log("error");
        };
        navigator.geolocation.getCurrentPosition(success, failure, {
            enableHighAccuracy: true
        });
    },
    whatcity: function(position) {
        console.log('whatcity');
        var request = XMLHttpRequest();
        request.open("GET", 
            "http://open.mapquestapi.com/geocoding/v1/reverse?key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
            position.coords.latitude + "," + position.coords.longitude, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    console.log(request.responseText);
                    var obj = JSON.parse(request.responseText);
                    var city = document.getElementById("city");
                    city.value = obj.results[0].locations[0].adminArea5;
                }
            }
        };
        request.send();

    }
};
