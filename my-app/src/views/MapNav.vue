<template>
  <div class="text-center">
    <h1>Canteen Selection Map</h1>
    <v-container class="text-center">
      <v-select label="Select Canteen" outlined class="mx-3" :items="markers" item-text="infoText" @change="markerChanged" v-model="currentPlace" return-object></v-select>
      <GmapMap
        :center="center"
        :zoom="16"
        :options="options"
        style="width: 94vw; height: 54vh"
        class="black--text"
      >
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
      </gmap-info-window>
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :label="m.label"
          :clickable="true"
          @click="toggleInfoWindow(m,index);center=m.position;currentPlace=m;"
        ></GmapMarker>
      </GmapMap>
      <v-row v-if="!(currentPlace.infoText == '')">
        <v-col>
          <v-btn color="green" @click="mapnav(currentPlace.id)">Change To {{currentPlace.infoText}}</v-btn>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-btn @click="mapnav(1)">Change To Maggi House</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="mapnav(2)">Change To Management Canteen</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="mapnav(3)">Change To Engineering Canteen</v-btn>
        </v-col>
      </v-row> -->
      <v-snackbar color="white" class="black--text" v-model="snackbar" :timeout="5000">
        <span class="font-weight-bold">{{ textMsg }}</span>
        <v-btn fab text class="black--text" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  props: ["cid", "cart"],
  data() {
    return {
      snackbar: false,
      textMsg: "",
      center: {
        lat: 19.0742026,
        lng: 72.897533
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      options: {
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]
      },
      markers: [
        // {
        //   position: {
        //     lat: 19.0760428,
        //     lng: 72.8991258
        //   },
        //   infoText: "Aurobindo Canteen",
        //   id:"0"
        // },
        // {
        //   position: {
        //     lat: 19.0731003,
        //     lng: 72.899106
        //   },
        //   infoText: "Maggi House",
        //   id:"1"
        // },
        // {
        //   position: {
        //     lat: 19.0729641,
        //     lng: 72.897894
        //   },
        //   infoText: "Management Canteen",
        //   id:"2"
        // },
        // {
        //   position: {
        //     lat: 19.0731564,
        //     lng: 72.9000113
        //   },
        //   infoText: "Engineering Canteen",
        //   id:"3"
        // }
      ],
      places: [],
      currentPlace: {
        infoText:""
      }
    };
  },
  methods: {
    markerChanged(){
      this.toggleInfoWindow(this.currentPlace,this.currentPlace.id)
      this.center = this.currentPlace.position
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    mapnav(value) {
      this.$emit("cidChanged", value);
      this.$router.push("/home");
      // this.cart = {}
      this.$emit("cartChanged", {});
    }
  },
  mounted() {
    firebase.database().ref("canteens").once("value",snapshot=>{
      snapshot.forEach(canteen=>{
        this.markers.push({
          position:canteen.val().position,
          infoText:canteen.val().infoText,
          id:canteen.key
        })
      })
    })
  }
};
</script>

<style>
</style>