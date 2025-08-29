---
title: Linux-查看进程（ps）
date: 2025-08-29 11:32:33
tags: [linux, ps, 进程]
categories:
  - Linux 
---

- `-a` 显示所以进程
- `-u` 显示用户信息
- `-x` 显示进程完整信息

```bash
root@ecs-ba0f:~# ps -aux
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
root 1 0.0 0.1 22836 14156 ? Ss Jul14 1:25 /sbin/init
noibrs
root 2 0.0 0.0 0 0 ? S Jul14 0:00 [kthreadd]
```

**USER**: 进程的拥有者。这通常是运行该进程的用户帐户的名称。
**PID**:进程ID。每个进程都有一个唯一的ID，用于标识该进程。
**%CPU**: 该进程占用的CPU使用率百分比。
**%MEM**: 该进程占用的物理内存使用率百分比。
**VSZ**:虚拟内存大小，单位是KB。这表示进程使用的虚拟内存量。
**RSS**:常驻集大小，单位是KB。这表示进程在物理内存中占用的固定大小。
**TTY**: 终端类型。如果进程没有与任何终端关联，则显示为"?"。
**STAT**: 进程状态。这描述了进程的当前状态，例如运行中、休眠等。
**START**: 进程启动的时间。
**TIME**: 该进程实际使用CPU的时间，单位是小时:分钟:秒。
**COMMAND**: 启动进程的命令名称或命令行。