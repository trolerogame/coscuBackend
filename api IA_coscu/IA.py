text = input()


array = text.split(" ")

array.sort(key=lambda x: len(x))

print(f"la palabra mas larga fue: {array[len(array)-1]}")
            