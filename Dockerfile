# สร้าง image
FROM node:18

# ตั้งค่าตำแหน่งงานใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

#เอาไฟล์ทั้งหมด
COPY . .

# สร้างแอปพลิเคชัน Next.js
RUN npm run build

#เปิด port 
EXPOSE 3000

# คำสั่งสำหรับรันแอปพลิเคชัน
CMD ["npm", "start"]
