FROM oven/bun:1 as base
WORKDIR /build
COPY . .
RUN bun install
EXPOSE 5173
CMD ["bun", "--bun", "run", "dev"]