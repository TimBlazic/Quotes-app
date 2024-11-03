import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const FirstPage = () => {
  const [quote, setQuote] = useState(
    "Click Get Quote button to see your first quote."
  );
  const [author, setAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("money");
  const [showCategories, setShowCategories] = useState(false);

  const fetchQuote = async () => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${selectedCategory}`,
        {
          headers: {
            "X-Api-Key": "XtCXa5ZlCw/4ki69xrch0w==9ejU9tji8a5lV82a",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } else {
        setQuote("No quotes available");
        setAuthor("");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote");
    }
  };

  const categories = ["leadership", "success", "life", "god", "money"];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Motivation</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowCategories(!showCategories)}
        >
          <Icon name="list" type="material" color="black" size={35} />
        </TouchableOpacity>
        {showCategories && (
          <View style={styles.categoryList}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(category)}
              >
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.getQuote} onPress={fetchQuote}>
        Get Quote
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  topBar: {
    position: "absolute",
    top: 20,
    right: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    position: "relative",
  },
  categoryList: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
  },
  categoryItem: {
    paddingVertical: 5,
  },
  quote: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  author: {
    color: "grey",
    marginBottom: 20,
  },
  getQuote: {
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    padding: 20,
  },
});

export default FirstPage;
