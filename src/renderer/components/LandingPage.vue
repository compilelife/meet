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
import { Context } from "../generator/Defs"
const { ipcRenderer, remote } = require("electron")
const fs = require("fs")
import Matercolor from "matercolors"
const wallpaper = require('wallpaper')

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
    generate: function () {
      const ctx = new Context()
      const screenSize = remote.screen.getPrimaryDisplay().size
      ctx.width = this.width = screenSize.width
      ctx.height = this.height = screenSize.height
      const randomColor = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
      ctx.colors = new Matercolor(randomColor)

      const svg = SVG(this.$refs.canvas)
      svg.clear()

      const gens = require('../generator/Picker').default.pickOne()
      gens.forEach(gen=>gen.generate(svg,ctx))
    },
    _svgToPng: async function() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height

      const svgNode = this.$refs.canvas.cloneNode(true)
      const factor = remote.screen.getPrimaryDisplay().scaleFactor
      if (factor > 1) {//高分屏
        canvas.width *= factor
        canvas.height *= factor
        svgNode.setAttribute('width', canvas.width)
        svgNode.setAttribute('height', canvas.height)
        svgNode.setAttribute('transform', `scale(${factor},${factor})`)
      }

      const image = await new Promise((resolve, reject)=>{
        const serializer = new XMLSerializer()
        const source =
          '<?xml version="1.0" standalone="no"?>\r\n' +
          serializer.serializeToString(svgNode)
        const image = new Image()
        image.onload = ()=>resolve(image)
        image.onerror = (e)=>reject(e)
        image.src =
          "data:image/svg+xml;base64," +
          window.btoa(unescape(encodeURIComponent(source))) //给图片对象写入base64编码的svg流
      })

      const context = canvas.getContext("2d") //取得画布的2d绘图上下文
      context.fillStyle = "white"
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0)

      return canvas.toDataURL()
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