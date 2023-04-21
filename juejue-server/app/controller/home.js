'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  // 修改index
  // async index() {
  //   const { ctx } = this;
  //   const { id } = ctx.query;
  //   // ctx.body = 'hi, egg';
  //   ctx.body = id;
  // }
  async index() {
    const { ctx } = this;
    // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
    await ctx.render('index.html', {
      title: 'i am happy', // 将 title 传入 index.html
      slot: '让自己快乐叫做意义',
    })
  }
  // 获取用户信息
  // async user() {
  //   const { ctx } = this;
  //   const { id } = ctx.params; // 通过 params 获取申明参数
  //   ctx.body = id;
  // }

  // async user() {
  //   // 可以 this 上下文，拿到 MySQL 的实力方法，对数据库进行 CRUD 操作。
  //   const { ctx } = this;
  //   const { name, slogen } = await ctx.service.home.user();
  //   ctx.body = {
  //     name,
  //     slogen
  //   }
  // }
  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }
  // 新增用户接口
  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null
      }
    }
  }
  // 编辑
  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null
      }
    } catch(error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null
      }
    }
  }
  // 删除
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null
      }
    } catch(error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null
      }
    }
  }
  // post请求方法
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    // Egg 框架内置了 bodyParser 中间件来对 POST 请求 body 解析成 object 挂载到 ctx.request.body 上
    ctx.body = {
      title,
    };
  }
}

module.exports = HomeController;
