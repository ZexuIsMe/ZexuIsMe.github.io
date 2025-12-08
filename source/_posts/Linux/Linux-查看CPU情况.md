---
title: Linux-查看CPU情况
date: 2025-11-08 08:42:25
tags: [linux, CPU]
categories:
  - Linux
---


## 多核 CPU 全局监控工具

mpstat 属于 systat 工具集，用于查看每个 CPU 核心的使用率，负载、中断数等指标。帮助定位多核场景下的性能瓶颈，如某核心过载

```text
yum install sysstat -y  # CentOS/RHEL
apt install sysstat -y   # Ubuntu/Debian
```

### mpstat

mpstat 显示所有 CPU 核心的平均统计，自系统启动以来
mpstat 1 每秒刷新一次，显示实时 CPU 状态
mpstat 1 5 每秒刷新一次，共输出 5 次
mpstat -p ALL 1 显示每个 CPU 核心的实时数据（-p ALL 表示所有核心）
mpstat -u -p 0 1 仅监控 CPU 0 核心的“用户态、内核态、空闲率”（-u 是默认模式）


### pidstat