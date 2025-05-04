# 智能公司研究助手 🔍

![web ui](<static/ui-1.png>)

一个多智能体工具，用于生成全面的公司研究报告。该平台使用一系列AI智能体来收集、整理和综合任何公司的信息。

## 功能特点

- **多源研究**：从公司网站、新闻文章、财务报告和行业分析等多个来源收集数据
- **AI驱动的内容过滤**：使用Tavily的相关性评分进行内容筛选
- **实时进度流**：使用WebSocket连接流式传输研究进度和结果
- **双模型架构**：
  - Gemini 2.0 Flash用于高上下文研究综合
  - GPT-4.1用于精确的报告格式化和编辑
- **现代React前端**：具有实时更新、进度跟踪和下载选项的响应式UI
- **模块化架构**：使用专业研究和处理节点构建的管道

## 智能体框架

### 研究管道

该平台遵循智能体框架，使用专门的节点按顺序处理数据：

1. **研究节点**：
   - `CompanyAnalyzer`：研究核心业务信息
   - `IndustryAnalyzer`：分析市场定位和趋势
   - `FinancialAnalyst`：收集财务指标和业绩数据
   - `NewsScanner`：收集最新新闻和发展动态

2. **处理节点**：
   - `Collector`：汇总所有分析器的研究数据
   - `Curator`：实现内容过滤和相关性评分
   - `Briefing`：使用Gemini 2.0 Flash生成特定类别的摘要
   - `Editor`：使用GPT-4.1-mini将简报编译和格式化为最终报告

   ![web ui](<static/agent-flow.png>)

### 内容生成架构

该平台利用不同的模型以获得最佳性能：

1. **Gemini 2.0 Flash**（`briefing.py`）：
   - 处理高上下文研究综合任务
   - 擅长处理和总结大量数据
   - 用于生成初始类别简报
   - 在多个文档之间高效维护上下文

2. **GPT-4.1 mini**（`editor.py`）：
   - 专注于精确的格式化和编辑任务
   - 处理markdown结构和一致性
   - 在遵循精确格式说明方面表现出色
   - 用于：
     - 最终报告编译
     - 内容去重
     - Markdown格式化
     - 实时报告流式传输

这种方法结合了Gemini处理大上下文窗口的优势和GPT-4.1-mini在遵循特定格式说明方面的精确性。

### 内容筛选系统

该平台在`curator.py`中使用内容过滤系统：

1. **相关性评分**：
   - 文档由Tavily的AI驱动搜索进行评分
   - 需要达到最低阈值（默认0.4）才能继续
   - 分数反映与特定研究查询的相关性
   - 更高的分数表示与研究意图更好的匹配

2. **文档处理**：
   - 内容被标准化和清理
   - URL被去重和标准化
   - 文档按相关性分数排序
   - 通过WebSocket发送实时进度更新

### 实时通信系统

该平台实现了基于WebSocket的实时通信系统：

![web ui](<static/ui-2.png>)

1. **后端实现**：
   - 使用FastAPI的WebSocket支持
   - 为每个研究任务维护持久连接
   - 发送各种事件的结构化状态更新：
     ```python
     await websocket_manager.send_status_update(
         job_id=job_id,
         status="processing",
         message=f"Generating {category} briefing",
         result={
             "step": "Briefing",
             "category": category,
             "total_docs": len(docs)
         }
     )
     ```

2. **前端集成**：
   - React组件订阅WebSocket更新
   - 实时处理和显示更新
   - 不同的UI组件处理特定类型的更新：
     - 查询生成进度
     - 文档筛选统计
     - 简报完成状态
     - 报告生成进度

3. **状态类型**：
   - `query_generating`：实时查询创建更新
   - `document_kept`：文档筛选进度
   - `briefing_start/complete`：简报生成状态
   - `report_chunk`：流式报告生成
   - `curation_complete`：最终文档统计

## 安装设置

### 快速安装（推荐）

最简单的方法是使用安装脚本：

1. 克隆仓库：
```bash
git clone https://github.com/pogjester/tavily-company-research.git
cd tavily-company-research
```

2. 使安装脚本可执行并运行：
```bash
chmod +x setup.sh
./setup.sh
```

安装脚本将：
- 检查所需的Python和Node.js版本
- 可选创建Python虚拟环境（推荐）
- 安装所有依赖（Python和Node.js）
- 指导您设置环境变量
- 可选启动后端和前端服务器

您需要准备以下API密钥：
- Tavily API密钥
- Google Gemini API密钥
- OpenAI API密钥
- MongoDB URI（可选）

### 手动安装

如果您更喜欢手动安装，请按照以下步骤操作：

1. 克隆仓库：
```bash
git clone https://github.com/pogjester/tavily-company-research.git
cd tavily-company-research
```

2. 安装后端依赖：
```bash
# 可选：创建并激活虚拟环境
python -m venv .venv
source .venv/bin/activate

# 安装Python依赖
pip install -r requirements.txt
```

3. 安装前端依赖：
```bash
cd ui
npm install
```

4. 创建包含API密钥的`.env`文件：
```env
TAVILY_API_KEY=your_tavily_key
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# 可选：启用MongoDB持久化
# MONGODB_URI=your_mongodb_connection_string
```

### Docker安装

可以使用Docker和Docker Compose运行应用程序：

1. 克隆仓库：
```bash
git clone https://github.com/pogjester/tavily-company-research.git
cd tavily-company-research
```

2. 创建包含API密钥的`.env`文件：
```env
TAVILY_API_KEY=your_tavily_key
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# 可选：启用MongoDB持久化
# MONGODB_URI=your_mongodb_connection_string
```

3. 构建并启动容器：
```bash
docker compose up --build
```

这将启动后端和前端服务：
- 后端API将在`http://localhost:8000`可用
- 前端将在`http://localhost:5174`可用

停止服务：
```bash
docker compose down
```

注意：更新`.env`中的环境变量时，需要重启容器：
```bash
docker compose down && docker compose up
```

### 运行应用程序

1. 启动后端服务器（选择一种方式）：
```bash
# 选项1：直接Python模块
python -m application.py

# 选项2：使用Uvicorn的FastAPI
uvicorn application:app --reload --port 8000
```

2. 在新终端中启动前端：
```bash
cd ui
npm run dev
```

3. 在`http://localhost:5173`访问应用程序

## 使用方法

### 本地开发

1. 启动后端服务器（选择一个选项）：

   **选项1：直接Python模块**
   ```bash
   python -m application.py
   ```

   **选项2：使用Uvicorn的FastAPI**
   ```bash
   # 如果尚未安装，安装uvicorn
   pip install uvicorn

   # 使用热重载运行FastAPI应用
   uvicorn application:app --reload --port 8000
   ```

   后端将在以下位置可用：
   - API端点：`http://localhost:8000`
   - WebSocket端点：`ws://localhost:8000/research/ws/{job_id}`

2. 启动前端开发服务器：
   ```bash
   cd ui
   npm run dev
   ```

3. 在`http://localhost:5173`访问应用程序

### 部署选项

该应用程序可以部署到各种云平台。以下是一些常见选项：

#### AWS Elastic Beanstalk

1. 安装EB CLI：
   ```bash
   pip install awsebcli
   ```

2. 初始化EB应用：
   ```bash
   eb init -p python-3.11 tavily-research
   ```

3. 创建并部署：
   ```bash
   eb create tavily-research-prod
   ```

#### 其他部署选项

- **Docker**：应用程序包含用于容器化部署的Dockerfile
- **Heroku**：使用Python构建包直接从GitHub部署
- **Google Cloud Run**：适用于具有自动扩展功能的容器化部署

选择最适合您需求的平台。该应用程序是平台无关的，可以托管在任何支持Python Web应用程序的地方。

## 贡献

1. Fork仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 详情请参阅[LICENSE](LICENSE)文件。

## 致谢

- [Tavily](https://tavily.com/)提供研究API
- 所有其他开源库及其贡献者 