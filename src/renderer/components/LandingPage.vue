<template>
  <div class="wrapper">
    <div class="actionbar">
      <el-button type="primary" round @click="generate">下一张</el-button>
      <el-button round @click="apply">设置壁纸</el-button>
      <el-button round @click="saveAs">保存壁纸</el-button>
    </div>
    <svg
      class="shower"
      :width="width"
      :height="height"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      ref="canvas"
    ></svg>
  </div>
</template>

<script>
import { SVG } from "@svgdotjs/svg.js"
import { Context, Mask } from "../generator/Defs"
const { ipcRenderer, remote } = require("electron")
const fs = require("fs")
import Matercolor from "matercolors"
import { Aux } from '../generator/Aux'
const wallpaper = require('wallpaper')
import {svgAsPngUri} from 'save-svg-as-png'

let lastSavePath = ''

export default {
  name: "landing-page",
  data: function () {
    return {
      width: 800,
      height: 600,
    }
  },
  methods: {
    generate: async function () {
      const ctx = new Context()
      const screenSize = remote.screen.getPrimaryDisplay().size
      ctx.width = this.width = screenSize.width
      ctx.height = this.height = screenSize.height
      const color = Aux.randColor()
      ctx.colors = new Matercolor(color)

      const svg = SVG(this.$refs.canvas)
      svg.clear()

      const pickRet = require('../generator/Picker').default.randomPick()
      if (pickRet.mask) {
        const maskSVG = SVG().width(this.width).height(this.height)
        pickRet.mask.generate(maskSVG, ctx)
        ctx.mask = new Mask(maskSVG)
        await ctx.mask.init(maskSVG)
      }
      pickRet.generator.generate(svg, ctx)
      if (pickRet.filter)
        pickRet.filter.generate(svg, ctx)
    },
    _svgToPng: async function() {
      return await svgAsPngUri(this.$refs.canvas, {
        backgroundColor: 'white',
        encoderOptions: 1,
      })
    },
    apply: async function () {
      const data = await this._svgToPng()
      const base64 = data.replace(/^data:image\/\w+;base64,/, "") //去掉图片base64码前面部分data:image/pngbase64
      const dataBuffer = new Buffer(base64, "base64")

      fs.unlink(lastSavePath,()=>{})
      const savePath = require("os").tmpdir() + `/${new Date().getTime()}.png`
      console.log('save to '+savePath)
      fs.writeFileSync(savePath, dataBuffer)
      lastSavePath = savePath

      wallpaper.set(savePath).catch(reason=>{
        console.log(`set wallpaper failed: ${reason}`)
        alert('壁纸设置失败，请先保存后手动通过系统设置来设置壁纸')
      })
    },
    saveAs: async function() {//设置壁纸出错(相同路径)
      const data = await this._svgToPng()

      const a = document.createElement('a')
      a.href = data
      a.download = 'wallpaper.png'
      a.click()
    }
  },
}
</script>

<style>
@font-face {
  font-family: 'Leafs';
  src: url('../assets/Leafs.ttf');
}
.actionbar {
  display: flex;
  margin: 8px;
  position: absolute;
  z-index: 1;
}
.shower {
  vertical-align: top;
}
</style>