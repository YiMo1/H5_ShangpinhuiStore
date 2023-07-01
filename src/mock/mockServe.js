import Mockjs from "mockjs";
import banner from './banner.json'
import floor from './floor.json'

Mockjs.mock("/mock/banner", { code: 200, data: banner })
Mockjs.mock("/mock/floor", { code: 200, data: floor })