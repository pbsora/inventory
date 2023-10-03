#! /usr/bin/env node

console.log("Populating Katana database");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Katana = require("./models/katana");
const Category = require("./models/category");

const katanas = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createKatanas();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, desc) {
  const category = new Category({
    name: name,
    description: desc,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added Category: ${name}`);
}

async function katanaCreate(index, name, url, desc, price, stock, category) {
  const katanaDetail = {
    name: name,
    imageUrl: url,
    description: desc,
    price: price,
    inStock: stock,
  };

  if (category != false) katanaDetail.category = category;
  const katana = new Katana(katanaDetail);
  await katana.save();
  katanas[index] = katana;
  console.log(`Added katana: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Shinai",
      "For duel practice, using the Bogu it is safe to hit someone else"
    ),
    categoryCreate(
      1,
      "Bokuto",
      "Bokuto, for Kata practice, be it with someone else or alone"
    ),
    categoryCreate(2, "Iaito", "Iaito, for Iaijutsu practice"),
  ]);
}

async function createKatanas() {
  console.log("Adding katanas");
  await Promise.all([
    katanaCreate(
      0,
      "JAPANESE HOKKAIDO OAK BOKUTO",
      "https://tozandoshop.com/cdn/shop/products/1_000000005587_670x.jpg?v=1648192654",
      "Not only is it robust, durable, and water-resistant, but the beauty and elegance of the oak, which is neither too heavy nor too light, makes it the ideal wood for wooden swords for kendo and other martial arts, swinging, and kata practice.",
      75,
      3,
      categories[1]
    ),
    katanaCreate(
      1,
      "SANADA YUKIMURA'S MURAMASA KOSHIRAE",
      "https://tozandoshop.com/cdn/shop/products/s1logo_670x.jpg?v=1677053658",
      "High-quality silk Sageo features the purple Kikko - tortoiseshell pattern. A sand-cased, reinforced aluminum-zinc alloy blade provides superb balance for dynamic air-slashing moves. Each part is uncompromisingly hand-assembled by the Japanese sword craftsman, who is an expert in making the genuine Japanese sword, Shinken. The blade is available up to 2.45 shaku. Weight without Saya is approximately 800 grams (for 2.45 shaku).",
      815,
      1,
      categories[2]
    ),
    katanaCreate(
      2,
      "SUZAKU - KOBANGATA SHINAI",
      "https://tozandoshop.com/cdn/shop/products/SET2036-2_db6156aa-6acf-434a-bf9e-79896c5b8b1f_840x.jpg?v=1589532235",
      "This is a Shinai with an Oval Grip. Suzaku's oval grip imitates the oval shaped grip of a real sword. The oval shaped grip is said to be great for Suburi as it's said that this shape promotes and makes it easier to remember the correct way to grip the Shinai.",
      65,
      5,
      categories[0]
    ),
    katanaCreate(
      3,
      "ITTO RYODAN - KOTO SHINAI",
      "https://tozandoshop.com/cdn/shop/products/SET2066-2_1bdf2cce-4f1a-457d-abf6-23891399e7cd_670x.jpg?v=1589532250",
      "This shinai is a koto-style shinai with a slightly heavier tip. The body of the shinai is slim and close to straight, because of this it feels slightly heavier in your hands compared to our standard Kihon shinai. Also since it is made using specially selected heavy keichiku bamboo, the whole shinai has a sense of weight to it, which makes the balance similar to that of a real katana.",
      67,
      7,
      categories[0]
    ),
    katanaCreate(
      4,
      "SEIRYU - SAKURA HIGO KOSHIRAE IAITO",
      "https://tozandoshop.com/cdn/shop/products/070-N26_5BD-S_5D-2_670x.jpg?v=1622623336",
      "The Sakura Higo Koshirae features blackened brass fuchi and kashira with a gold-inlaid cherry blossom theme and an iron tsuba with sukashi-style cherry trees as a theme. The saya lacquer is available in kuroro, kuroishime and chaishime. A sand-casted, a bubble-free zinc/aluminum alloy blade available up to 2.70 shaku. The tsuka is carefully hand-wrapped with cotton braids over black tsukasame and the sageo matches with the tsuka color. The menuki are of course also cherry themed. For those who prefer a kojiri attachment, the Sakura Higo Koshirae's saya can be customized with one that matches the sakura theme.",
      660,
      2,
      categories[2]
    ),
    katanaCreate(
      5,
      "SEIRYU - KAGO KOSHIRAE IAITO",
      "https://tozandoshop.com/cdn/shop/files/image1476_1_1_1_670x.jpg?v=1689217726",
      "This Kago Koshirae features silver-plated brass Fuchi/Kashira with baskets theme and an iron-made, bamboo leaves tsuba which matches with the Fuchi/Kashira theme. Tigers in bamboo bushes are featured as silver-plated brass menuki. Saya lacquer is available in kuroro, kuroishime and chaishime. A sand-casted, a bubble-free zinc/aluminum alloy blade available up to 2.70 shaku. Tsuka is carefully hand-wrapped with cotton braids over white tsukasame and the sageo matches the tsuka color. For those who prefer a kojiri attachment, This Kago Koshirae also offers kojiri options for the saya.",
      669,
      1,
      categories[2]
    ),
    katanaCreate(
      6,
      "TSUBAKI DELUXE BOKUTO",
      "https://tozandoshop.com/cdn/shop/products/013-BKH8CS-L-4_670x.jpg?v=1589183231",
      "This Deluxe Camellia Bokken is made of selected high quality Camellia wood grown in Japan and features a ridged spine and rounded butt for a more realistic Shinken feeling when training. Available in Long and Short versions This long model is recommended for Aikido and Koryu pracitioner for suburi and general paired contact kata practice.",
      127,
      4,
      categories[1]
    ),
    katanaCreate(
      7,
      "HIJIKATA TOSHIZO'S KANESADA KOSHIRAE - HEAVYWEIGHT BLADE",
      "https://tozandoshop.com/cdn/shop/products/070-LGTOSIZO-5_670x.jpg?v=1636617520",
      "This Kanesada Koshirae is the perfect replica of original sword preserved at Hijikata Toshizo Museum in Saitama prefecture. Ishime Higo type Fuchi/Kashira and Kuwagata Kojiri are made of brass and the surface are carefully oxidized by hand. Tsuba is Ishime Mokko style and the theme is Ume Ichirin(one plum). Menuki set features the theme of Japanese pepper. A black cotton Tsuka cord is bound over white Tsukasame. Saya is finished Anshu Ishime(dark reddish brown matte finish). Cotton Sageo is also included. A sand-cased, extra-reinforced wide zinc/aluminum alloy blade provides the superb balance for the dynamic air-slashing move. Hamon reproduces the work of Aizu Kanesada the 11th. Each parts are uncompromisingly hand-assembled by the Japanese sword craftsman, who is expert in making the genuine Japanese sword, Shinken. The blade is available up to 2.50 shaku. Weight without Saya is approximately 1000 gram(for 2.50 shaku). Proudly made in Japan.",
      1045,
      1,
      categories[2]
    ),
  ]);
}
