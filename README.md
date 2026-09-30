# 个人主页 · 使用说明

这是一个纯静态的个人主页，不需要安装任何东西，也不需要编译。
上传到 GitHub 后打开 GitHub Pages 即可访问。

## 一、需要改哪些地方

所有需要个性化的内容都在 `index.html` 里，搜索 `★` 就能找到全部位置：

| 想改什么 | 在哪里 |
| --- | --- |
| 浏览器标签标题 | `<title>` |
| 名字（导航栏 / 首屏 / 页脚） | 搜索 `你的名字` |
| 一句话介绍、自我介绍 | `<title>` 下方的 description、`.hero__tagline`、`#about` 段落 |
| 头像 | 把 `.hero__avatar` 里的 `<svg>` 换成 `<img src="avatar.jpg" alt="我的头像">` |
| 技能标签 | `#skills` 下的 `<li>` |
| 作品卡片 | `#projects` 下的 `<article class="card">`，复制一个就是新增项目 |
| 邮箱、社交链接 | `#contact` 里的 `mailto:` 和 `.social` |
| 数据（几年经验等） | `.facts` 里的三个 `<strong>` |

配色想改的话，打开 `styles.css`，只改最上面 `:root` 里的 `--accent` 和 `--accent-2` 两个颜色即可。

## 二、本地预览

直接双击 `index.html` 就能在浏览器打开。

## 三、发布到 GitHub Pages

### 方式 A：双击脚本，无需下载任何东西（推荐）

双击 **`推送到GitHub.cmd`**，按提示操作即可。它使用 Visual Studio 自带的 Git，全程不下载任何东西。

1. 输入你的 GitHub 用户名
2. 脚本把网页复制到 `文档\personal-site`，建立本地仓库并提交
3. 第一次运行时会打开浏览器要求登录 GitHub，点授权即可（不需要密码或令牌）
4. 如果仓库还不存在，脚本会提示你去 https://github.com/new 建一个名为 `你的用户名.github.io` 的空仓库，建好后按回车继续
5. 自动推送，然后等待网站上线并打开浏览器

跑完后窗口里会显示你的网址。以后改了网页内容，重新双击一次就会更新线上版本。

> **注意**：新建仓库时不要勾选 README、.gitignore 等初始化选项，保持空仓库，否则第一次推送会冲突。

### 方式 B：全自动版本（需要联网下载 GitHub 工具）

如果方式 A 里的浏览器登录用不了，可以改用 **`一键发布.cmd`**。它会自动下载 GitHub 官方命令行工具、自动创建仓库、自动开启 Pages，连仓库都不用你手动建。

缺点是下载走 GitHub 的发布服务器，国内网络可能很慢甚至卡住。卡住时按 `Ctrl+C` 中断，改用方式 A。

想先检查环境而不实际发布，可以在 PowerShell 里执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\push-to-github.ps1 -User 你的用户名
powershell -ExecutionPolicy Bypass -File .\publish.ps1 -DryRun
```

### 方式 C：网页手动上传（不用任何工具）

1. 打开 https://github.com/new 新建仓库。
2. 仓库名填 **`你的用户名.github.io`**（把「你的用户名」换成你真实的 GitHub 用户名，大小写要一致）。这样发布出来的地址最短：`https://你的用户名.github.io`。
   如果想用别的仓库名也可以，那样地址会是 `https://你的用户名.github.io/仓库名/`。
3. 可见性选 **Public**，点击 **Create repository**。
4. 进入仓库后点 **Add file → Upload files**，把本文件夹里的
   `index.html`、`styles.css`、`script.js`、`404.html`、`.nojekyll`
   全部拖进去，然后点 **Commit changes**。
   > 如果 `.nojekyll` 传不上去（有的系统会隐藏这个文件），可以忽略，不影响访问。
5. 点仓库的 **Settings → Pages**：
   - **Source** 选 `Deploy from a branch`
   - **Branch** 选 `main`，文件夹选 `/ (root)`
   - 点 **Save**
6. 等 1～3 分钟刷新页面，顶部会显示你的网址，例如 `https://你的用户名.github.io`。

以后想改内容，重复第 4 步重新上传覆盖同名文件即可，改完等一分钟自动更新。

## 四、进阶（可选）

- **绑定自己的域名**：在仓库 Settings → Pages → Custom domain 填域名，再到域名服务商添加一条 CNAME 记录指向 `你的用户名.github.io`。
- **用命令行发布**：装好 Git 后，在文件夹里执行 `git init`、`git remote add origin 仓库地址`、`git add .`、`git commit -m "site"`、`git push -u origin main`。
